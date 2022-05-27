const mongoose = require("mongoose");
const validator = require("validator");

const SpecificationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    icon:{
        type:Object,  
    }
},{timeStamp:true}
);
const Specification= mongoose.model("Specification",SpecificationSchema);
module.exports = Specification
