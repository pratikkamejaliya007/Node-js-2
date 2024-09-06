import movie from "../model/moviemodel.js";
import fs from 'fs'
import path from "path";
import { title } from "process";
import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

export const getdata= async(req,res)=>{
    try{
        let data= await movie.find({})
        res.render("index",{data})
    }catch(err){
        res.status(501).send("Data Not Found")
    }
}

export const add = async(req,res)=>{
    res.render("add")
}

export const adddata = async(req,res)=>{
    
    const poster = req.files['poster'] ? req.files['poster'][0].path : null;
    const video = req.files['video'] ? req.files['video'][0].path : null;
    
    
    req.body.poster=poster
    req.body.video=video
    try{
        await movie.create(req.body)
        res.status(201).redirect("/")
    }catch(err){
        res.status(501).send("Data Not Add")
    }
}

export const deletedata = async(req,res)=>{
    try{
        const deletedata =await movie.findById(req.params.id)
        const imgpath= path.join(__dirname,"..",deletedata.poster)
        const videopath = path.join(__dirname,"..",deletedata.video)
        if(deletedata){
            fs.unlinkSync(imgpath)
            fs.unlinkSync(videopath)
        }
        await movie.findByIdAndDelete(req.params.id)
        res.status(200).redirect("/")
    }catch(err){
        res.status(501).send("Data Not Deleted");
    }
}

export const getedit = async(req,res)=>{
    console.log(req.params.id)
    try{
        let editdata = await movie.findById(req.params.id)
        console.log(editdata)
        res.render("edit",{editdata})
    }catch(err){
        res.status(501).send("Edit Data Not Found")
    }
}

export const postedit=async(req,res)=>{
    try{
  
        const editdata = await movie.findById(req.params.id)

        const poster = req.files['poster'] ? req.files['poster'][0].path : editdata.poster;
        const video = req.files['video'] ? req.files['video'][0].path : editdata.video;

        const imgpath = path.join(__dirname,'..',editdata.poster)
        const videopath = path.join(__dirname,"..",editdata.video)

        if(req.files['poster']){
            req.body.poster = poster
            fs.unlinkSync(imgpath)
        }else{
            req.body.poster = poster
        }

        if(req.files['video']){
            req.body.video = video
            fs.unlinkSync(videopath)
        }else{
            req.body.video = video
        }
        
        await movie.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).redirect("/")
    }catch(err){
        res.status(501).send("Data Not Edited")
    }
}