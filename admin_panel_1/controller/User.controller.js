import User from "../model/register.model.js";
import jwt from 'jsonwebtoken'
import sendotp from '../middleware/mail.js';

export const register=(req,res)=>{
    res.render("register")
}

export const addregister=async(req,res)=>{
    try{
        const user=await User.create(req.body)

        const token=jwt.sign({id:user._id,mail:user.email,password:user.password},'pratik007')

        res.cookie('authToken', token, {
            httpOnly: true, 
            maxAge: 3600000,
        });
    
        res.status(201).redirect("/")
    }catch(err){
        res.status(400).send("User Not Add")
    }
}

export const logout=(req,res)=>{
    res.clearCookie("authToken")
    res.redirect('/login');
}

export const Sendotp = async(req,res)=>{    
    try {
        const otp = Math.floor(100000 + Math.random() * 900000); 
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.redirect("/login");
        }

        sendotp(email, otp);

        const data = { id: user._id, otp };
        res.cookie('otp', data, {
            httpOnly: true,
            maxAge: 3600000, 
        });
        
        res.status(200).render("resetPassword")
    } catch (err) {
        console.error("Error sending OTP:", err);
        res.status(500).redirect("/login")
    }
} 

export const resetpassword = async(req,res)=>{    
    try{
        const {otp,newPassword,confirmPassword} = req.body
        const otpCookie = req.cookies.otp;

        if(otpCookie.otp == otp){
            if(newPassword == confirmPassword){
                await User.findByIdAndUpdate(otpCookie.id,{password:newPassword})
                res.status(201).redirect("/login")
            }else{
                res.status(400).redirect("back")
            }
        }else{
            res.status(400).redirect("back")
        }

    }catch(err){
        res.status(200).redirect("back")
    }
}