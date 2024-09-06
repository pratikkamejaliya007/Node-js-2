import multer from "multer";

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "poster") {
            cb(null, "uploads/img");
        } else if (file.fieldname === "video") {
            cb(null, "uploads/video");
        } else {
            cb(new Error("Invalid field name"), false);
        }
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop(); // get file extension
        cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
    }
});

// Middleware for handling multiple files
const uploadpic = multer({ storage: Storage }).fields([
    { name: 'poster', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]);

export default uploadpic;