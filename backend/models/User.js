const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    emailNotification:{
        type:Boolean,
        default:true
    },
    otp:{
        type:String // otp for verification
    },
    otpExpiry:{
        type:Date
    },
    isVerified:{
        type:Boolean,
        default:false    // email verification status
    }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);