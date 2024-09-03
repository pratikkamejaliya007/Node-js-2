import mongoose from "mongoose";

const db=mongoose.connect('mongodb://localhost:27017/multer')
        .then(()=> console.log("Mongo Db Conncted"))
        .catch((err)=> console.error(err))

export default db;