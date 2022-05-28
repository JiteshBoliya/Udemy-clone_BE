const mongoose = require("mongoose");
const validator = require("validator");

const DoubtsSchema = new mongoose.Schema(
  {
    mamber:[
        {
            user1:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",                      
            },
            user2:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",                      
            }
        }
    ],
    massage:[
        {
            auther:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",                          
            },
            text:{
                type:String
            }
        }
    ],
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timeStamp: true }
);
const Doubts = mongoose.model("Doubts", DoubtsSchema);
module.exports = Doubts;
