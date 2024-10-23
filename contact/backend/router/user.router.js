import express from 'express'
import { register , addregister ,login,addlogin,logout , Change } from "../controller/user.contoller.js";

const userrouter=express.Router()

    userrouter.get("/register",register)
    userrouter.post("/register",addregister)

    userrouter.get("/login",login)
    userrouter.post("/login",addlogin)
    userrouter.post("/password_change",Change)

    userrouter.get("/logout",logout)

export default userrouter;