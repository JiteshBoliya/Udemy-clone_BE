const mongoose = require("mongoose");
const validator = require("validator");

const CatagorySchema = new mongoose.Schema({
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
const Catagory= mongoose.model("Catagory",CatagorySchema);
module.exports = Catagory

