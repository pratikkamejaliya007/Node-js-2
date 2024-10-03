import { Schema , model } from "mongoose";

const ProductSchema= new Schema({
    title :{
        type : String,
        required : true,
    },
    price :{
        type : Number,
        required : true
    },
    rating:{
        type:Number,
        required : true
    },
    ProductImg:{
        type:String,
        required:true
    },
    SubcategoryID:{
        type: Schema.Types.ObjectId,
        ref:"Subcategory",
        required:true
    }
},{timestamps:true})

const Product=model("product",ProductSchema)

export default Product