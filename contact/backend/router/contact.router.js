import express from 'express'
import { contact,getcontact,addcontact , deletedata , getedit , postedit } from '../controller/contact.controller.js'
import upload from '../middleware/multer.js'
import { auth } from '../middleware/auth.js'

const contactrouter=express.Router()

contactrouter.get("/",auth,contact)
contactrouter.get("/add",auth,getcontact)
contactrouter.post("/add",auth,upload,addcontact)

contactrouter.get("/delete/:id",deletedata)
contactrouter.get("/edit/:id",getedit)
contactrouter.post("/edit/:id",upload,postedit);

export default contactrouter