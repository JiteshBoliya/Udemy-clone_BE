const mongoose = require("mongoose");
const validator = require("validator");

const RatingSchema = new mongoose.Schema(
  {
    course: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    rating:{
        type:Number
    },
    review:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Subscriber",    
    },
    uploadDate:{
        type:Date
    }
},
  { timeStamp: true }
);
const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
