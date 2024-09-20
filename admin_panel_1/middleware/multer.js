import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const fileExtenstion=file.originalname.split(".").pop()
        cb(null,file.fieldname+ '-' + Date.now()+'.'+fileExtenstion)
    }
})

const uploads=multer({storage}).single('profile')

export default uploads;
