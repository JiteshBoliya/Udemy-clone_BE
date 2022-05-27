const mongoose = require("mongoose");
const validator = require("validator");

const GetInTouchSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type:String,  
    },
    Subject:{
        type:String,  
    },
    massage:{
        type:String,  
    },
    Status:{
        type:String,
        default:'Not seen'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timeStamp:true}
);
const GetInTouch= mongoose.model("GetInTouch",GetInTouchSchema);
module.exports = GetInTouch

