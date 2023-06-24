const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "avatars",
    allowedFormats: ["jpg", "png"],
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;