const mongoose = require("mongoose");
const validator = require("validator");

const CartSchema = new mongoose.Schema(
  {
    subscriber:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    tax:{
        type:Number
    },
    discount:{
        type:Number
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timeStamp: true }
);
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
