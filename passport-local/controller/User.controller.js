import User from "../model/register.model.js";
import jwt from 'jsonwebtoken'

export const register=(req,res)=>{
    res.render("register")
}

export const addregister=async(req,res)=>{
    try{
        const user=await User.create(req.body)

        // const token=jwt.sign({id:user._id,mail:user.email,password:user.password},'pratik007')

        // res.cookie('authToken', token, {
        //     httpOnly: true, 
        //     maxAge: 3600000,
        // });
    
        res.status(201).redirect("/")
    }catch(err){
        res.status(400).send("User Not Add")
    }
}

export const logout=(req,res)=>{
    res.clearCookie("demo")
    res.redirect('/login');
}