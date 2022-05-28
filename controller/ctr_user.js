const req = require("express/lib/request");
const users = require("../model/user");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const { response } = require("express");
const nodemailer = require("nodemailer");
let code=""
let loginData=""
let status=0

// #Register user
exports.register_User = async function (req, res) {
  console.log("send:"+code);
  console.log("store:"+loginData);
  console.log("get:"+req.body.code);
  if(code==req.body.code){
  try {
    users.count({email:loginData.email},(_err,data)=>{
      if(data==0){
        const register = new users(loginData);
        register.password = cryptr.encrypt(loginData.password);
        register.save();
        res.status(201).send(register);
      }
      else res.status(406).send({error:"Email Id is already Registered..!"})
    })
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}
else{
  res.status(406).send({error:"code in not valid..!"})
}

};
// #Login user
exports.login_user = async (req,res) => {
    users.find({email:req.body.email},(_err,data)=>{
      if([...data].length>0){
        const password = cryptr.decrypt(data[0].password);
        const user=users.findOneAndUpdate({email:req.body.email}, {token:req.body.token},{upsert: true}, function (error, result) {
          if (error) return res.status(404).send({ error: error.message })
          if(password!=req.body.password) return res.status(400).send({ error:"Password is not valid...!" })
          const user = result
          const token = user.genrateAuthToken();
          res.status(201).send(user)
        });
      }
      else res.status(406).send({error:"Email id is Invalid..!"})
    })
};
// #User Detail by id
exports.get_user_byId = async(req,res)=>{
  const Users = users.findOne({_id:req.params.id}, function (err, data) {
      if (err) res.status(400).send({ error: err.message });
      res.status(200).send(data);
    });
}
// #User Detail by token
exports.get_user_byId = async(req,res)=>{
  const Users = users.findOne({token:req.params.token}, function (err, data) {
      if (err) res.status(400).send({ error: err.message });
      res.status(200).send(data);
    });
}
// #Check valid email
exports.validEmail =async(req,res)=>{
  loginData=req.body
  code=makeid()
  status=mailtoverify(loginData.email)
  res.status(200).send({status:1})
}
// #Check valid email
exports.forgetPassword =async(req,res)=>{
  const Users = users.findOne({_id:req.params.id}, function (err, data) {
    if (err) res.status(400).send({ error: err.message });
    let email=data.email
    let password=cryptr.decrypt(data.password)
    forgetPasswordMail(email,password)
    res.status(200).send(data);
  });
}
// #class code genrator
const makeid=()=>{
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
// #verify mail
const mailtoverify =(email) => {
  let status=0
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jiteshb8182@gmail.com",
      pass: "",
    },
  });
  var mailOptions = {
    from: "jiteshb8182@gmail.com",
    to: email,
    subject: "Verify your Email",
    html: `here code to verify your email <h1> ${code} </h1>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {  
    if (error) return 0
    else {
      status =1
    }
    return info
  })
  return 1
};
// #forget password mail
const forgetPasswordMail =(email,password) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jiteshb8182@gmail.com",
      pass: "",
    },
  });
  var mailOptions = {
    from: "jiteshb8182@gmail.com",
    to: email,
    subject: "Forget Password",
    html: `here your password <h1> ${password} </h1>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {  
    if (error) return 0
    // else return 1
    // return info
  })
  return 1
};
