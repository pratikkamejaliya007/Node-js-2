import { model,Schema } from "mongoose";

const SubcategorySchema = new Schema({
    subcategory:{
        type : String,
        required : true
    },
    CategoryId:{
        type : Schema.Types.ObjectId,
        ref:"category",
    }
},{timestamps:true})

const Subcategory = model("Subcategory",SubcategorySchema)

export default Subcategory;