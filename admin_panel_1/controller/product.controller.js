import Product from "../model/Productmodel.js";
import Subcategory from "../model/subcategorymodel.js";

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url"
import { dirname } from 'path'

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

export const View_product = async(req,res)=>{
    try{
        let product= await Product.find()
        .populate({
            path: 'SubcategoryID',
            populate: {
              path: 'CategoryId',  // Populate the publisher field inside each book
              model: 'category'
            }
          })
          console.log(JSON.stringify(product, null, 2))
        res.render("view-product",{product}) 
    }catch(err){
        res.status(400).send(err)
    }
}

export const addproduct = async(req,res) => {
    try{
        let sub = await Subcategory.find()
        res.render("add-product",{sub})
    }catch(err){
        res.status(400).send(err)
    }    
}

export const postproduct = async(req,res)=>{
    try{
        req.body.ProductImg = req.file.path
        await Product.create(req.body)
        res.status(201).redirect("/product")
    }catch(err){
        res.status(400).send(err)
    }
}

export const product_del = async(req,res)=>{
    try{
        let olddata = await Product.findById(req.params.id)
        
        const imgpath = path.join(__dirname,'../',olddata.ProductImg)
        if (fs.existsSync(imgpath)) {
            fs.unlinkSync(imgpath);
        }

        await Product.findByIdAndDelete(req.params.id)
        res.status(200).redirect("/product")
    }catch(err){
        res.status(400).send(err)
    }
}

export const pro_edit=async(req,res)=>{
    try{
        let sub = await Subcategory.find()
        let edit=await Product.findById(req.params.id);
        res.render('edit-product',{edit,sub})
    }catch(err){
        res.status(400).send(err)
    }
}

export const edit_post = async(req,res)=>{
    try{
        const { title , price , rating , SubcategoryID  } = req.body;
        let updateData = { title , price , rating , SubcategoryID  };
        
        if(req.file){
            let old = await Product.findById(req.params.id)
            updateData.ProductImg = req.file.path;
            const oldimg = path.join(__dirname, '../',old.ProductImg);  
            if (fs.existsSync(oldimg)) {
            fs.unlinkSync(oldimg);
            }
        }
        await Product.findByIdAndUpdate(req.params.id,updateData)
        res.status(201).redirect("/product")
    }catch(err){
        res.status(400).send(err)
    }
}
