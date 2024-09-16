import Contact from "../model/contact.model.js";
import fs from 'fs'
import { fileURLToPath } from "url";
import path from 'path'

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

export const contact=async(req,res)=>{
    try{
        let userdata=await Contact.find({userid:req.user.id})
        res.render("show-contact",{userdata})
    }catch(err){
        res.status(400).send(err)
    }
}

export const getcontact=(req,res)=>{
    res.render("contact-add")
}

export const addcontact=async(req,res)=>{
    try{
        if(req.file){
            req.body.profile=req.file.path
        }
        req.body.userid = req.user.id
        await Contact.create(req.body)
        res.status(201).redirect("/contact")
    }catch(err){
        res.status(400).send(err)
    }
}

export const deletedata = async(req,res)=>{
    try{
        const single=await Contact.findById(req.params.id)
        const imgpath= path.join(__dirname,"..",single.profile)
        let img=single.profile.split('/').pop()
            
        if(img != 'default.png'){
                fs.unlinkSync(imgpath)
        }

        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).redirect("/contact")
    }catch(err){
        res.status(400).send(err)
    }
} 

export const getedit=async(req,res)=>{
    try{
        const single=await Contact.findById(req.params.id)
        const data=await Contact.findById(req.params.id)
        res.render("edit",{data})
    }catch(err){
        res.status(400).send(err)
    }
}

export const postedit=async(req,res)=>{
    try{
        const single=await Contact.findById(req.params.id)
        const imgpath= path.join(__dirname,"..",single.profile)
        let img=single.profile.split('/').pop()    
        if(req.file){
            req.body.profile = req.file.path
            if(img != 'default.png'){
                fs.unlinkSync(imgpath)
            }
        }
        await Contact.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).redirect("/contact")
    }catch(err){
        res.status(400).send(err)
    }
}