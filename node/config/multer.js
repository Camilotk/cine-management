const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


module.exports = {
    
  dest: path.resolve(__dirname, "..","..", "..","react","src", "images"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..","..", "..","react","src", "images"));
    },
    filename: (req, file, cb) => {
      
        

        file.key = `${file.originalname}`;

        cb(null, file.key);
      
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};