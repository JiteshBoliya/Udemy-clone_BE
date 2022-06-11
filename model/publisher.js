const mongoose = require("mongoose");
const validator = require("validator");

const publisherSchema = new mongoose.Schema(
  {
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name:{
        type:String
    },
    phoneno: {
      type: Number,
    },
    image: {
      type: String,
    },
    job:{
        type:String
    },
    link:{
        instagram:{
            type:String,
        },
        facebook:{
            type:String
        },
        linkedIn:{
            type:String
        },
        twitter:{
            type:String
        },
        youtube:{
            type:String
        }
    },
    status:{
      type:String,
      default:"Active"
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timeStamp: true }
);
const Publisher = mongoose.model("Publisher", publisherSchema);
module.exports = Publisher;
