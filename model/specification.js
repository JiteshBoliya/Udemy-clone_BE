const mongoose = require("mongoose");
const validator = require("validator");

const SpecificationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    icon:{
        type:String,  
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
},{timeStamp:true}
);
const Specification= mongoose.model("Specification",SpecificationSchema);
module.exports = Specification

