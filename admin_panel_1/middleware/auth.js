import jwt from 'jsonwebtoken';
import User from '../model/register.model.js';

export const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.authToken
        if(!token){
           return res.status(401).redirect("/login")
        }
        const decode=jwt.verify(token,'pratik007')
        const user=await User.findOne({email: decode.mail})
        if(!user){
            return res.status(401).redirect("/register")
        }
        req.user=decode
        next()
    }catch(err){
       return res.status(400).send(err)
    }
}


export const check=(req,res,next)=>{
    const token=req.cookies.authToken
    if(token){
        return res.status(200).redirect("/")
    }
    next()
}