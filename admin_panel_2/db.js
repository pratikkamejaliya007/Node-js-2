import mongoose from "mongoose";

const db=mongoose.connect('mongodb://localhost:27017/Admin_2')
        .then(()=> console.log("Mongo Db Connected"))
        .catch((err)=> console.error(err))

export default db;