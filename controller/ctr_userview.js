const Tutorials = require("../model/curriculam");
const Course = require("../model/course");
const Purchase = require("../model/purachse");
const path = require("path");

exports.set_purchase = async function (req, res) {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    return res.status(201).send({ purchase });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};
exports.get_user_courses = async function (req, res) {
  const course = Purchase.find(
    { isDeleted: false, user: req.params.id },
    (err, data) => {
      if (err) return res.status(400).send({ error: err.message });
      res.status(200).send(data);
    }
  ).populate({ path: "course", populate: { path: "publisher" } });
};
exports.get_courses_userlist = async function (req, res) {
  let courseList = new Array();
//   let purchaseList = new Array();
  let total=0
  const course = Course.find({ isDeleted: false, publisher: req.params.id },(err, data) => {
      if (err) return res.status(400).send({ error: err.message });
      courseList = data;
      courseList.forEach((courses) => {
           Purchase.count({ isDeleted: false,course:courses._id},(err, data) => {
            if (err) return res.status(400).send({ error: err.message });
            total+=data
            // return res.status(200).send({ data: total }); 
            })  
    })
    return res.status(200).send({ data: total });  
    });
  
};
