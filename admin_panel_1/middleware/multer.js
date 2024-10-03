import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Check the fieldname and assign the upload path accordingly
        if (file.fieldname === 'profile') {
            cb(null, 'uploads/profile');
        } else if (file.fieldname === 'categoryimg') {
            cb(null, 'uploads/category');
        } else if (file.fieldname === 'ProductImg') {
            cb(null, 'uploads/product');
        } else {
            cb(new Error('Invalid field name'), false);
        }
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Get the file extension
        cb(null, file.fieldname + '-' + Date.now() + fileExtension); // Create a unique filename
    }
});

const upload = multer({ storage });

// Middleware for single file upload
// Here you can specify which field you're expecting: 'profile' or 'categoryimg'
export const uploadProfile = upload.single('profile');
export const uploadCategoryImg = upload.single('categoryimg');
export const uploadsproduct = upload.single("ProductImg")
