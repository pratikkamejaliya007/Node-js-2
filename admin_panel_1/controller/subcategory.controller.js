import Category from "../model/Category.model.js";
import Subcategory from "../model/subcategorymodel.js";

export const sub=async(req,res)=>{
    try{
        let category=await Category.find({})
        res.render("add-subcategory",{category})
    }catch(err){
        res.status(400).send(err)
    }
}

export const add_sub=async(req,res)=>{
    try{
        await Subcategory.create(req.body)
        res.status(201).redirect("back")
    }catch(err){
        res.status(400).send(err)
    }
}

export const view_sub = async(req,res)=>{
    try{        
        let sub=await Subcategory.find().populate("CategoryId")
        res.render("view-subcategory",{sub})
    }catch(err){
        res.status(400).send(err)
    }
}

export const delete_sub = async(req,res)=>{
    try{
        await Subcategory.findByIdAndDelete(req.params.id);
        res.status(200).redirect("/subcategory")
    }catch(err){
        res.status(400).send(err)
    }
}

export const edit_sub =async(req,res)=>{
    try{
        let editsub= await Subcategory.findById(req.params.id) 
        let category=await Category.find({})
        res.render("edit-subcategory",{category,editsub})  
    }catch(err){
        res.status(400).send(err)
    }
}

export const edit_post = async(req,res)=>{
    try{
        await Subcategory.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).redirect("/subcategory")
    }catch(err){
        res.status(400).send(err)
    }
}