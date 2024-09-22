import { User } from "../model/User.model.js";
import { Contact } from "../model/Contact.model.js";
import bcrypt from 'bcryptjs'

export const register=(req,res)=>{
    res.render("authentication-register")
}

export const Adduser = async(req,res)=>{
    const {user,email,password} = req.body
    let hashpassword = await bcrypt.hash(password,10)
    try{
        const data=await User.create({user,email,hashpassword})
        res.status(201).redirect("/")
    }catch(err){
        res.status(400).json({message:'Data Not Add'})
    }
}

export const login=(req,res)=>{
    res.render("authentication-login")
}

export const checklogin= async(req,res)=>{
    const {email,password} = req.body
    try{
      let data = await User.findOne({email})
      if(!data){
        res.redirect("/login")
      }

      const ismatch= await bcrypt.compare(password,data.hashpassword)

      if(ismatch){
        res.status(200).redirect("/")
      }else{
        res.status(400).redirect("/login")
      }              
    }catch(err){
        res.status(400).send(err)
    }
}

export const index=async(req,res)=>{
    try{
        let data=await Contact.find({userid : req.user._id})
        res.render("index",{data})
    }catch(err){
        res.status(400).send(err)
    }
}

export const logout=(req,res)=>{
    req.logout(function(err){
        if(err){ return next(err);}
        res.redirect('/login')
    }
)
}

export const forms=(req,res)=>{
    res.render('forms')
}

export const add= async(req,res)=>{
    req.body.userid = req.user._id
    console.log(req.body)
    try{
        await Contact.create(req.body)
        res.status(201).redirect("/")
    }catch(err){
        res.status(400).send(err)
    }
}

export const del=async(req,res)=>{
    try{
        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).redirect('/')
    }catch(err){
        res.status(400).send(err)
    }
}

export const edit=async(req,res)=>{
    try{
        let editdata= await Contact.findById(req.params.id)
        res.render("edit",{editdata})
    }catch(err){
        res.status(400).send(err)
    }
}

export const editdata = async(req,res)=>{
    try{
        await Contact.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).redirect("/")
    }catch(err){
        res.status(400).send(err)
    }
}