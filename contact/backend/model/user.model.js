import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String
    },
    email:{
        type:String,
        unique:true
    }
},{timestamps:true})

const User=mongoose.model("user",userSchema)

export default User