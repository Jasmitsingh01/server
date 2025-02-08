import multer from "multer";
import path from "path";

const StorageOption=multer.diskStorage({
  destination(req, file, callback) {
     callback(null, path.join(__dirname,'../public/')) 
  },
  filename(req, file, callback) {
    callback(null,Date.now()+file.originalname)
  },
})
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' || // Allow JPEG
      file.mimetype === 'image/png' ||  // Allow PNG
      file.mimetype === 'image/gif'     // Allow GIF
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(null, false); // Reject non-image files
    }
  };

const upload = multer({
  storage: StorageOption,
  fileFilter: fileFilter
});


export default upload