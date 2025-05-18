const upload = require("../../middlewares/upload");
const { uploadController, deleteFileFromCloudinary } = require("../controllers/media_upload/media_upload_controller");

const router = require("express").Router();

router.post("/upload", upload.single('media'), uploadController);
router.post("/delete",  deleteFileFromCloudinary);

module.exports = router;
