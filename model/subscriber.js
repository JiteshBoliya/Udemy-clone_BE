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
      default:""
    },
    lastname: {
      type: String,
      default:""
    },
    phoneno: {
      type: Number,
      default:0000000
    },
    nationality: {
      type: String,
      default:""
    },
    email: {
      type: String,
      default:""
    },
    job:{
        type:String,
        default:""
    },
    image: {
      type: Object,
      default:""
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
