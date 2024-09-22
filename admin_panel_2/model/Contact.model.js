import { Schema , model } from "mongoose";

const ContactSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type: String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    userid:{
        type:Schema.ObjectId,
        ref:'users',
        required:true
    }    
},{timestamps:true})

export const Contact = model("Contact",ContactSchema)