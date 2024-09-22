import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcryptjs'

import { User } from "./model/User.model.js";

passport.use('local',new LocalStrategy(
    {usernameField:'email'},
    async(email,password,done)=>{
        let data= await User.findOne({email:email});
        if(data){
            const ismatch=bcrypt.compare(password,data.hashpassword)
            if(ismatch){
                return done(null,data)
            }else{
                return done(null,false)
            }
        }else{
            return done(null,false)
        }
    }
))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let data= await User.findById(id)
    data ? done(null,data) : done(null,false)
})

passport.checkAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
         next()
    }else{
        res.redirect("/login")
    }
}

passport.setAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

export default passport