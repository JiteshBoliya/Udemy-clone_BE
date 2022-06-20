const Tutorials = require("../model/curriculam");
const Course = require("../model/course");
const Purchase = require("../model/purachse");
const Rating = require('../model/rating')

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
  let arr = [];
  const course = await Course.find({ isDeleted: false, publisher: req.params.id });
      for (const objCourse of course) arr.push(Purchase.count({isDeleted: false,course:objCourse._id}).populate('user').populate('course'));
      const promiseResponse = await Promise.all(arr);
      return res.status(200).send(promiseResponse);  
};
exports.get_course_userlist_Limit = async function (req, res) {
    const course = await Course.find({ isDeleted: false, publisher: req.params.id });
    let arr = [];
    for (const objCourse of course) arr.push(Purchase.find({isDeleted: false,course:objCourse._id}).populate('user').populate('course'));
    const promiseResponse = await Promise.all(arr);
    return res.status(200).send(promiseResponse);  
};


//-------------------------------------------------

exports.get_AVG_Rating_Course =async function (req,res) {
  const course = await Course.find({ isDeleted: false, publisher: req.params.id });
  let arr = [];
  for (const objCourse of course) arr.push(Rating.find({isDeleted:false,course:objCourse._id}))  
  const promiseResponse = await Promise.all(arr);
    return res.status(200).send(promiseResponse); 
} 
