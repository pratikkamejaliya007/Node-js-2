import { Router } from 'express'
import { Adduser , login, register , index , checklogin , logout ,forms , add , del, edit, editdata} from '../controller/user.controller.js'
import passport from '../passport.js'

const userrouter=Router()

userrouter.get("/register",register)
userrouter.post("/register",Adduser)

userrouter.get("/login",login)
userrouter.post("/login",passport.authenticate('local',{failureRedirect:"/login",successRedirect:'/'}),checklogin)

userrouter.get("/logout",logout)

userrouter.get("/",passport.checkAuth,index)

userrouter.get("/forms",passport.checkAuth,forms);
userrouter.post("/add",passport.checkAuth,add)
userrouter.get("/delete/:id",passport.checkAuth,del)
userrouter.get("/edit/:id",passport.checkAuth,edit)
userrouter.post("/edit/:id",passport.checkAuth,editdata)

export default userrouter