const mongoose = require("mongoose");
const validator = require("validator");

const PurchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    date:{
        type:Date,
        default:new Date()
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);
const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;
