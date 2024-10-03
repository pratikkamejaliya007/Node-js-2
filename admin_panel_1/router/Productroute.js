import { Router } from "express";
import { View_product,addproduct,postproduct , product_del , pro_edit , edit_post } from "../controller/product.controller.js";
import { uploadsproduct } from "../middleware/multer.js";
import { auth } from '../middleware/auth.js'

const productrouter = Router()

productrouter.get("/",auth,View_product)
productrouter.get("/add",auth,addproduct)
productrouter.post("/add",auth,uploadsproduct,postproduct)
productrouter.get("/del/:id",auth,product_del)

productrouter.get("/edit/:id",auth,pro_edit)
productrouter.post("/edit/:id",auth,uploadsproduct,edit_post)

export default productrouter