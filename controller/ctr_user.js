const req = require("express/lib/request");
const users = require("../model/user");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const { response } = require("express");
const nodemailer = require("nodemailer");
const Subscriber = require("../model/subscriber");
const Publisher = require("../model/publisher");
const Course = require("../model/course");

let code = "";
let loginData = "";
let status = 0;

// #Register user
exports.register_User = async function (req, res) {
  // console.log("send:"+code);
  // console.log("store:"+loginData);
  // console.log("get:"+req.body.code);
  if (code == req.body.code) {
    try {
      users.count({ email: loginData.email }, (_err, data) => {
        if (data == 0) {
          const register = new users(loginData);
          register.password = cryptr.encrypt(loginData.password);
          register.save();

          if (register.type == "publisher") {
            const publisher = new Publisher({ user: register._id });
            publisher.save();
            return res
              .status(201)
              .send({ register, type: "publisher created" });
          } else if (register.type == "subscriber") {
            const subscriber = new Subscriber({ user: register._id });
            subscriber.save();
            return res
              .status(201)
              .send({ register, type: "subscriber created" });
          } else if (register.type == "admin") {
            return res.status(201).send({ register, type: "Admin created" });
          } else return res.status(401).send({ error: "Not valid user..!" });

          //  return res.status(201).send({register});
        } else
          return res
            .status(406)
            .send({ error: "Email Id is already Registered..!" });
      });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  } else {
    res.status(406).send({ error: "code is not valid..!" });
  }
};
// #Login user
exports.login_user = async (req, res) => {
  users.find({ email: req.body.email }, (_err, data) => {
    if ([...data].length > 0) {
      const password = cryptr.decrypt(data[0].password);
      const user = users.findOneAndUpdate(
        { email: req.body.email },
        { token: req.body.token },
        { upsert: true },
        function (error, result) {
          if (error) return res.status(404).send({ error: error.message });
          if (password != req.body.password)
            return res.status(400).send({ error: "Password is not valid...!" });
          const user = result;
          const token = user.genrateAuthToken();
          res.status(201).send(user);
        }
      );
    } else res.status(406).send({ error: "Email id is Invalid..!" });
  });
};
// #User Detail by id
exports.get_user_byId = async (req, res) => {
  const Users = users.findOne({ _id: req.params.id }, (err, data) => {
    if (err) res.status(400).send({ error: err.message });
    else res.status(201).send({ data });
  });
};
// #User Detail by token
exports.get_user_bytoken = async (req, res) => {
  const Users = users.findOne(
    { token: req.params.token },
    function (err, data) {
      if (err) res.status(400).send({ error: err.message });
      res.status(200).send(data);
    }
  );
};
// #Check valid email
exports.validEmail = async (req, res) => {
  loginData = req.body;
  code = makeid();
  // console.log(loginData);
  status = mailtoverify(loginData.email);
  res.status(200).send({ status: "email sent" });
};
// #Check valid email
exports.forgetPassword = async (req, res) => {
  const Users = users.findOne({ email: req.body.email }, function (err, data) {
    if (err) res.status(400).send({ error: err.message });
    let email = data.email;
    let password = cryptr.decrypt(data.password);
    forgetPasswordMail(email, password);
    res.status(200).send({ data: "data" });
  });
};
exports.resetpassword = async (req, res) => {
  var pass = cryptr.encrypt(req.body.password);
  var query = { _id: req.params.id },
    update = { password: pass },
    options = { upsert: true, setDefaultsOnInsert: true };
  const user = users.findOneAndUpdate(
    query,
    update,
    options,
    function (error, result) {
      if (error) return;
      res.status(200).send(result);
    }
  );
};
exports.SendInvoice = async (req, res) => {
  invoiceMail(req.body.email);
};
// #class code genrator
const makeid = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
// #verify mail
const mailtoverify = (email) => {
  let status = 0;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jiteshb8182@gmail.com",
      pass: "xbltmmfflttobfhj",
    },
  });
  var mailOptions = {
    from: "jiteshb8182@gmail.com",
    to: email,
    subject: "Verify your Email",
    html: `here code to verify your email <h1> ${code} </h1>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    //  console.log(info);
  });
};
// #forget password mail
const forgetPasswordMail = (email, password) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jiteshb8182@gmail.com",
      pass: "xbltmmfflttobfhj",
    },
  });
  var mailOptions = {
    from: "jiteshb8182@gmail.com",
    to: email,
    subject: "Forget Password",
    html: `here your password <h1> ${password} </h1>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return 0;
  });
  return 1;
};

const invoiceMail = (email) => {
  console.log(email);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jiteshb8182@gmail.com",
      pass: "xbltmmfflttobfhj",
    },
  });
  var mailOptions = {
    from: "jiteshb8182@gmail.com",
    to: email,
    subject: "Invoice",
    html: `<html>

    <body align="center">
    <div style="width: 100%;" align="center">
    <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/11/26/hFeo0Dp7TMykR9jAYP8ga4rv/zip-for-upload/images/Order-Placed-Icon.jpg" alt="" srcset="">
    <h1>Order Placed Successfully</h1>
    <h3>Enjoy your course with..</h3>
      <b> Life time avaibility</b><br/>
      <b> Updated contant</b><br/>
      <b> Instructor support</b><br/>
    <hr>
    <img src="https://eduguard-html.netlify.app/dist/images/favicon/favicon.png" alt="">
    <h2>OnlineCourse</h2>
  </div>
    </body>
    
    </html>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return 0;
  });
  return 1;
};

// exports.Search = async (req, res) => {
//   let x = req.params?.data;
//   x = x.trim();
//   await Course.find(
//     { title: { $regex: req.params?.data, $options: "i" } },
//     (err, data) => {
//       if (err) return res.status(400).send({ error: err.message });
//       return res.status(200).send(data);
//     }
//   )
//     .populate("catagory")
//     .populate("publisher")
//     .limit(10);
// };

exports.Search = async (req, res) => {
  let x = req.params?.data;
  x = x.trim();
  console.log(x.length);
  try {
    console.log(typeof(x));
    
      const course = await Course
      .find({ title: { $regex: x, $options: "i" },name:{ $regex: x, $options: "i" } })
      .populate("catagory")
      .populate("publisher");
    if (course.length === 0) {
      return res.status(200).json({ data: "0" });
    }
    return res.json({ data: course });
  } catch (e) {
    return res.json({ error: e.message });
  }
};
