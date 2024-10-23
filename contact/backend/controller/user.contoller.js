import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

// register
export const register=(req,res)=>{
    res.render("register")
}

export const addregister=async(req,res)=>{
    try{
      const {username,email} = req.body;

        const hashpassword = await bcrypt.hash(req.body.password,10)

        const data=await User.create({username,password:hashpassword,email})
    
      const token = jwt.sign(
        { id: data._id, username: data.username },  
        "pratik007",  
        { algorithm: 'HS256', expiresIn: '1h' }  
      );
  
      res.cookie("jwt", token, {
        httpOnly: true, 
        sameSite: "Strict",  
        maxAge: 3600000  
      });
      res.status(201).json({ message: "Registration successful" });
    }catch(err){
        res.status(400).send(err)
    }
}

// login

export const login=(req,res)=>{
    res.render("login")
}

export const addlogin = async (req, res) => {
  try {
    // Find user by email
    let data = await User.findOne({ email: req.body.email });
    
    if (!data) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate password (assuming passwords are hashed)
    const isPasswordValid = await bcrypt.compare(req.body.password,data.password) 

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token with user's ID and username
    const token = jwt.sign(
      { id: data._id, username: data.username },  // Payload
      "pratik007",  // Secret key
      { algorithm: 'HS256', expiresIn: '1h' }  // Algorithm and token expiration time
    );

    // Set cookie with the token, and configure it securely
    res.cookie("jwt", token, {
      httpOnly: false,  // Prevent access from JavaScript (mitigates XSS)
      sameSite: "Strict",
      secure:false,  // Prevent CSRF attacks by restricting cross-origin requests
      maxAge: 3600000  // 1 hour in milliseconds (same as the JWT expiration time)
    });

    // Send success response
    res.status(200).json({ message: 'Login successful'});
  
  } catch (err) {
    // Handle error
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

  export const Change = async(req,res)=>{
    try{
      const {email,newpassword,conform} = req.body;
      
      let user = await User.findOne({email})

      if(!user){
        return res.status(400).json({message:"User Not Found"})
      }
      
      if(newpassword != conform){
        return res.status(400).json({message:"Password and Conform Password Not Match"})
      }
      let Hashpassword = await bcrypt.hash(newpassword,10)
      await User.findByIdAndUpdate(user._id,{password:Hashpassword})
      return res.status(201).json({message:"Password Changed"})
    }catch(err){
      return res.status(400).json({message:"Password Not Change"})
    }
  }

  // logout

  export const logout=(req, res) => {
    res.clearCookie('jwt')
    res.redirect("/login")
  }
  