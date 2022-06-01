const mongoose = require("mongoose");
const validator = require("validator");

const SubscriberSchema = new mongoose.Schema(
  {
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phoneno: {
      type: Number,
    },
    nationality: {
      type: String,
    },
    email: {
      type: String,
    },
    job:{
        type:String
    },
    image: {
      type: Object,
    },
    enroll: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        courseStatus: {
            type: String,
            default: "not Started",
        },
        paymentStatus: {
          type: String,
          default: "Unpaid",
        },
      },
    ],
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timeStamp: true }
);
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
