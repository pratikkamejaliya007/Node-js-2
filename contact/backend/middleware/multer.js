import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        const fileEx= file.originalname.split('.').pop()
        cb(null,file.filename + '-' + Date.now()+"."+fileEx)
    }
})

const upload=multer({storage}).single("profile")

export default upload;