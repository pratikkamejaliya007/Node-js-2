import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Admin', 'User'],
        default: 'User'
    },
    mail:{
        type:String,
        unique:true,
    },
    profile: {
        type: String,
        default: 'uploads/default.png' // Path to default image
    },
    message: {
        type: String
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
}, { timestamps: true });


const Admin=mongoose.model("admin",adminSchema)

export default Admin;
