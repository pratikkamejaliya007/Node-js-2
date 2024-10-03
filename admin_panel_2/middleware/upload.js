import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        const exe= file.originalname.split(".").pop()
        cb(null,file.fieldname + '-' + Date.now()+'.'+exe);
    }    
})

const uploadpic = multer({storage}).single("img")

export default uploadpic;