import Data from "../model/data.model.js";
import path from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dataget = async (req, res) => {
    try {
        const data = await Data.find({});
        res.status(200).render("show", { data });
    } catch (err) {
        res.status(501).send("Data Not Found");
    }    
};

export const add = (req, res) => {
    res.render("add");
};

export const adddata = async (req, res) => {
    req.body.img = req.file.path;
    try {
        await Data.create(req.body);
        res.status(201).redirect("/");
    } catch (err) {
        res.status(500).send("Data Not Created");
    }
};

export const deletedata = async (req, res) => {
    try {
        let single = await Data.findById(req.params.id);
        if (single) {
            const imgpath = path.join(__dirname, '..', single.img); 
            if (fs.existsSync(imgpath)) {
                fs.unlinkSync(imgpath); 
            } else {
                console.log('File not found:', imgpath);
            }
            await Data.findByIdAndDelete(req.params.id);
            res.status(200).redirect("/");
        } else {
            res.status(404).send("Data not found");
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send(err);
    }
};

export const editget = async(req,res)=>{
    try{
        const result = await Data.findById(req.params.id)
        res.render("edit",{result})
    }catch(err){
        res.status(501).send(err)
    }
}

export const editpost = async(req,res)=>{
    try{
        const single=await Data.findById(req.params.id)
        const imgpath = path.join(__dirname,'..',single.img)
        if(req.file){
            fs.unlinkSync(imgpath)
            req.body.img= req.file.path
        }

        await Data.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).redirect("/")
    }catch(err){
        res.status(501).send(err)
    }
}
