import mongoose from "mongoose";

const db=mongoose.connect('mongodb://localhost:27017/contact')
        .then(()=> console.log("Mongo Db Connected"))
        .catch((err)=> console.error(err))

export default db;