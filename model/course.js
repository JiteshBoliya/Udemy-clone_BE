const mongoose = require("mongoose");
const validator = require("validator");

const CourseSchema = new mongoose.Schema(
  {
    image:{
        type:String
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    uploadDate: {
          type: Date,
          default: new Date()
    },
    duration:{
        type:Number
    },
    price: {
      type: Number,
    },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
    },
    // specification: [
    //   {
    //     specification: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Specification",
    //     },
    //   },
    // ],
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timeStamp: true }
);
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
