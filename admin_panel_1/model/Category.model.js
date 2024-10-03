import { model,Schema } from "mongoose";

const CategorySchema = new Schema({
    category :{type :String , required:true},
    categoryimg : {type:String,required:true}
},{timestamps:true})

const Category=model("category",CategorySchema)

export default Category