import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String,
        unique:true
    },
    profile:{
        type:String,
        default:'uploads/default.png'
    },
    userid:{
        type : mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

const Contact=mongoose.model("contact",contactSchema)

export default Contact;