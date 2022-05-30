const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type:String,  
    },
    password:{
        type:String
    },
    type:{
        type:String,
        default:'subscriber'
    },
    token:{
        type:String,
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
},{timeStamp:true}
);

userSchema.methods.genrateAuthToken = async function(){
    const user=this
    if(user!=null){
    const token =jwt.sign({_id: user._id.toString()},"privatekey")
    user.token=token ;
    await user.save()
    return token
    }
}
userSchema.statics.findCredentials=async (email)=>User.findOne({email})

const User= mongoose.model("User",userSchema);
module.exports = User

