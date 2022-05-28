const mongoose = require("mongoose");
const validator = require("validator");

const CourseSchema = new mongoose.Schema(
  {
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
      type: String,
    },
    price: {
      type: Number,
    },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
    },
    curriculam: [
      {
        title: {
          type: String,
        },
        files: [
          {
            file: {
              type: Object,
            },
            lock: {
              type: String,
              default: "true",
            },
          },
        ],
      },
    ],
    specification: [
      {
        specification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Specification",
        },
      },
    ],
    uploadDate:{
        type:Date
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timeStamp: true }
);
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
