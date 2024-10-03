import { Router } from 'express'
import { Adduser , login, register , index , checklogin , logout ,forms , add , del, edit, editdata , change , changepassword} from '../controller/user.controller.js'
import passport from '../passport.js'
import uploadpic from '../middleware/upload.js'
import { add_category , adddata } from '../controller/category.controller.js'

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

userrouter.get("/changepassword",passport.checkAuth,change)
userrouter.post("/changepassword",passport.checkAuth,changepassword)

userrouter.get("/add_category",passport.checkAuth,add_category)
userrouter.post("/adddata",passport.checkAuth,uploadpic,adddata);

export default userrouter