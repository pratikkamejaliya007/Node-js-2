import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "./model/register.model.js";

passport.use("local",new LocalStrategy(
    {usernamefiled:'email'},
    async(email,password,done)=>{
        let admindata= await User.findOne({email:email});
        if(admindata){
            if(password == admindata.password){
                return done(null,admindata)
            }else{
                return done(null,false)
            }
        }else{
            return done(null,false)
        }
    }
))

passport.serializeUser((user,done)=>{
    return (null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let admindata= await User.findById(id);
    admindata ? done(null,admindata) : done(null,false)
})

passport.checkAuthentication= (req,res,next)=>{
    if(req.isAuthentication()){
        next()
    }else{
        res.redirect("/")
    }
}

passport.setAuthentication=(req,res,next)=>{
    if(req.isAuthentication()){
        res.locals.user = req.user
    }
    next()
}

export default passport