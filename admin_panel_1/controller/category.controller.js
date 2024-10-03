import Category from "../model/Category.model.js"
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url"
import { dirname } from 'path'

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)


export const show_category = async (req, res) => {
    try {
        let cate = await Category.find({});
        res.render("viewcategory", { cate });
    } catch (err) {
        res.status(400).send(err);
    }
};


export const Addcate = (req,res)=>{
    res.render("addcategory")
}

export const Added = async(req,res)=>{
    try{
        req.body.categoryimg = req.file.path
        await Category.create(req.body)
        res.status(201).redirect("/category/show");
    }catch(err){
        res.status(400).send(err)
    }
}

export const edit = async(req,res)=>{
    try{
        const update=await Category.findById(req.params.id);
        res.render("Editcategory",{update})
    }catch(err){
        res.status(400).send(err)
    }
}

export const edit_category = async (req, res) => {
    try {
        const { category } = req.body;
        let updateData = { category };

        let old = await Category.findById(req.params.id)

        // If a new image is uploaded, include it in the update
        if (req.file) {
            updateData.categoryimg = req.file.path;
            const oldImagePath = path.join(__dirname, '../',old.categoryimg);
  
            if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            }
        }

        await Category.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/category/show'); // Redirect to the category listing page after update
    } catch (err) {
        res.status(400).send(err);
    }
};

export const del = async(req,res)=>{
    console.log(req.params.id)
    try{
        let old= await Category.findById(req.params.id)
        const oldImagePath = path.join(__dirname, '../',old.categoryimg);
  
            if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            }

          await Category.findByIdAndDelete(req.params.id)
          res.status(200).redirect("/category/show")  

    }catch(err){
        res.status(400).send(err)
    }
}