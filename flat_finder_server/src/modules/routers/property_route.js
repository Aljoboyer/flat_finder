const verifyJWT = require("../../middlewares/authChecker");
const { propertyPostController, getAllPropertyController, updatePropertyController } = require("../controllers/property/property_controller");

const router = require("express").Router();

router.post("/post", verifyJWT(), propertyPostController);
router.get("/all", verifyJWT(), getAllPropertyController);
router.put("/update", verifyJWT(), updatePropertyController);

module.exports = router;
