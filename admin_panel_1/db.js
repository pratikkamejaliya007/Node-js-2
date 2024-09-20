import mongoose from "mongoose";

const Database = mongoose.connect("mongodb://localhost:27017/Admin_panel")
.then(()=> console.log("Mongo Db Connected"))
.catch(err => console.error(err))

export default Database;