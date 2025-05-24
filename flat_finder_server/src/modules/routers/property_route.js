const verifyJWT = require("../../middlewares/authChecker");
const { propertyPostController, getAllPropertyController, updatePropertyController, getSpecificProperty } = require("../controllers/property/property_controller");

const router = require("express").Router();

router.post("/post", verifyJWT(), propertyPostController);
router.get("/all", verifyJWT(), getAllPropertyController);
router.put("/update", verifyJWT(), updatePropertyController);
router.get("/property", verifyJWT(), getSpecificProperty);

module.exports = router;
