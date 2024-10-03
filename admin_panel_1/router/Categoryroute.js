import { Router } from "express";
import { uploadCategoryImg } from "../middleware/multer.js";
import { Addcate,Added ,show_category , edit_category,edit , del} from "../controller/category.controller.js";

import { auth } from "../middleware/auth.js";

const categoryrouter = Router()

categoryrouter.get("/show",auth,show_category)
categoryrouter.get("/",auth,Addcate)
categoryrouter.post("/",auth,uploadCategoryImg,Added)

categoryrouter.get("/edit/:id",auth,edit)
categoryrouter.post("/edit/:id",auth,uploadCategoryImg,edit_category)
categoryrouter.get("/del/:id",auth,del);

export default categoryrouter