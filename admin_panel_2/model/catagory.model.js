import { model , Schema } from "mongoose";

const CatagorySchema= new Schema({
    category : {
        type:String,
        required : true
    },
    img :{
        type:String,
        default: 'uploads/default.png' 
    }
},{timestamps:true});

let Catagory = model("Category",CatagorySchema);

export default Catagory;