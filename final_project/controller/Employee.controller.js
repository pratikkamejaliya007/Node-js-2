import Employee from "../model/Employee.model.js";
import bcrypt from 'bcryptjs'
import sendotp from "../middleware/Mail.js";

export const Employee_login = async(req,res)=>{
    try{
        let data = await Employee.findOne({email:req.body.email})
        if(!data){
            res.status(400).json({meg : "Employee Not Found"})
        }
        let ismatch = await bcrypt.compare(req.body.password,data.password)
        if(!ismatch){
            res.status(400).json({msg:"Password incorrected"})
        }
        res.status(200).json({msg:"Login Successfully"})
    }catch(err){
        res.status(400).json({msg:"Unothoried User"})
    }
}

export const view_employee = async(req,res)=>{
    try{
        let data = await Employee.findById(req.user.id)
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({msg:"Not found"})
    }
}

export const Change = async(req,res)=>{
    try{
        let data= await Employee.findOne({email:req.body.email})
        if(!data){
            res.status(400).json({meg:"User Not Found"})
        } 

        if(req.body.password == req.body.confrompassword){
            let password = await bcrypt.hash(req.body.password,10)
            await Employee.findByIdAndUpdate(data.id,{password})
            res.status(201).json({msg:"Password Channged"})
        }

        res.status(200).json({msg:"Password Not Match"})
        
    }catch(err){
        res.status(400).json({msg:"Unothorized"})
    }
}

export const otpsend = async(req,res)=>{
    try{
        const otp=Math.floor(10000+Math.random()*900000)
        const {email} = req.body
        const user = await Employee.findOne({email})
        sendotp(email,otp)
        const data = { id: user._id, otp };
        res.cookie('otp', data, {
            httpOnly: true,
            maxAge: 3600000, 
        });
        res.status(200).json({msg:"Otp Send"})
    }catch(err){
        res.status(400).json({msg:"Mail Not send"})
    }
}

export const forget = async(req, res) => {
    try {
        const { otp, newPassword, confirmPassword } = req.body;
        const otpCookie = req.cookies.otp;

        if (!otpCookie) {
            return res.status(400).json({ msg: "OTP expired or missing" });
        }

        if (otpCookie.otp == otp) {
            if (newPassword === confirmPassword) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                
                await Employee.findByIdAndUpdate(otpCookie.id, { password: hashedPassword });
                res.status(201).json({ msg: "Password Changed" });
            } else {
                res.status(400).json({ msg: "Passwords do not match" });
            }
        } else {
            res.status(400).json({ msg: "Incorrect OTP" });
        }
    } catch (err) {
        res.status(400).json({ msg: "Error resetting password" });
    }
};