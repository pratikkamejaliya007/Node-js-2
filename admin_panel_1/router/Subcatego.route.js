import { Router } from "express";
import { add_sub , sub , view_sub , delete_sub ,edit_sub ,edit_post } from "../controller/subcategory.controller.js";
import { auth } from "../middleware/auth.js";

const subcategoryrouter = Router()

subcategoryrouter.get("/",auth,view_sub)
subcategoryrouter.get("/add",auth,sub)
subcategoryrouter.post("/add",auth,add_sub)
subcategoryrouter.get("/delete/:id",auth,delete_sub)
subcategoryrouter.get("/edit/:id",auth,edit_sub)
subcategoryrouter.post("/edit/:id",auth,edit_post)

export default subcategoryrouter