import Catagory from "../model/catagory.model.js";

export const add_category= async(req,res)=>{
    try{
        const catagory = await Catagory.find({})
        res.render("category",{catagory})
    }catch(err){
        res.status(400).send(err)
    }
}

export const adddata= async(req,res)=>{
    try{
        if(req.file){
            req.body.img = req.file.path
        }
        await Catagory.create(req.body)
        res.status(201).redirect("/")
    }catch(err){
        res.status(400).send(err)
    }
}