const mongoose = require("mongoose");
const validator = require("validator");

const CurriculamSchema = new mongoose.Schema(
  {
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    title: {
      type: String,
    },
    videos: [
      {
        title:{
          type:String
        },
        link: {
          type: String,
        },
        lock: {
          type: String,
          default: "true",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);
const Curriculam = mongoose.model("Curriculam", CurriculamSchema);
module.exports = Curriculam;
