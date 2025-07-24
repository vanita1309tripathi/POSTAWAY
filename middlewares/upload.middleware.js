// middlewares/upload.middleware.js
import multer from "multer";
import path from "path";

// Set up storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});


// This ensures only image files are accepted.
// file.mimetype contains the file type, like image/jpeg, image/png, etc.
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images are allowed"), false);
};

export const upload = multer({ storage, fileFilter });
