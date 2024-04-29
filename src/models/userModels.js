import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true

    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
    },
    password:{
        type:String,
        required:[true,"Please fill the password"]

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User=mongoose.models.users || mongoose.model("users",userSchema)
export default User