import express from 'express'
import mongoose from 'mongoose'

const dataSchema=mongoose.Schema({
    user :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        // unique : true
    },
    img : {
        type : String,
        required : true
    }
},{timestamps : true})

const Data=mongoose.model("data",dataSchema)

export default Data