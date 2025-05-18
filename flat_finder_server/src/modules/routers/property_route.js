const verifyJWT = require("../../middlewares/authChecker");
const { propertyPostController, getAllPropertyController } = require("../controllers/property/property_controller");

const router = require("express").Router();

router.post("/post", verifyJWT(), propertyPostController);
router.get("/all", verifyJWT(), getAllPropertyController);

module.exports = router;
