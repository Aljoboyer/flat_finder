// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'property_uploads',
    resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'webm'],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });

module.exports = upload;
