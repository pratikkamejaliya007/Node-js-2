import {Schema,model} from "mongoose";
import { type } from "os";

const UserSchema=new Schema({
    user:{
        type:String,
        required : true
    },
    email:{
        type:String,
        unique : true
    },
    hashpassword:{
        type :String,
        required : true
    }
},{timestamps : true})

export const User=model("User",UserSchema)