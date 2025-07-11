const verifyJWT = require("../../middlewares/authChecker");
const { propertyPostController, getAllPropertyController,
     updatePropertyController, getSpecificProperty, propertySaveAndUnsave } = require("../controllers/property/property_controller");

const router = require("express").Router();

router.post("/post", verifyJWT(), propertyPostController);
router.get("/all", getAllPropertyController);
router.put("/update", verifyJWT(), updatePropertyController);
router.get("/property",  getSpecificProperty);
router.post("/save-unsave", verifyJWT(), propertySaveAndUnsave);

module.exports = router;
