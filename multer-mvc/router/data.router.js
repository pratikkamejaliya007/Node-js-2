import express from "express"
import { dataget , add , adddata , deletedata , editget , editpost } from "../controller/user.controller.js"
import uploadpic from "../multer.js"

const router=express.Router()

router.get("/",dataget)

router.get("/add",add)

router.post("/add",uploadpic,adddata)

router.get("/delete/:id",deletedata)

router.get("/edit/:id",editget)

router.post("/edit/:id",uploadpic,editpost)

export default router