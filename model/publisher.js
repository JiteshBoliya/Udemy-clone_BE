const mongoose = require("mongoose");
const validator = require("validator");

const publisherSchema = new mongoose.Schema(
  {
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    phoneno: {
      type: Number,
    },
    image: {
      type: Object,
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
    // publish: [
    //   {
    //     course: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Course",
    //     },
    //   },
    // ],
  },
  { timeStamp: true }
);
const Publisher = mongoose.model("Publisher", publisherSchema);
module.exports = Publisher;
