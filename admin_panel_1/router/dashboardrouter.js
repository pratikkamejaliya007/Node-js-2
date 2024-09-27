import express from 'express'
import { dashboard,from_basic, from_wizerd ,adddata, user, login , postlogin , deleteAdmin , edit,postedit} from '../controller/dashboardcontroller.js'

import { register , addregister , logout , Sendotp ,resetpassword } from '../controller/User.controller.js'

import { auth , check } from '../middleware/auth.js'
import uploads from '../middleware/multer.js'

const router=express.Router()

router.get("/register",register)
router.post("/register",addregister)
router.get("/logout",logout)
router.get("/login",check,login)
router.post("/login",postlogin)
router.get("/",auth,dashboard)

router.get("/users",auth,user)
router.get("/edit/:id",edit)
router.post("/edit/:id",auth,uploads,postedit)
router.get("/delete/:id",deleteAdmin)

router.get("/from_basic",auth,from_basic)
router.get("/from_wizerd",auth,from_wizerd)
router.post("/add",auth,uploads,adddata)

router.post("/sendotp",Sendotp)
router.post("/reset-password",resetpassword)

export default router