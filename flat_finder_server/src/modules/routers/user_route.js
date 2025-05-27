const verifyJWT = require("../../middlewares/authChecker");
const { getSpecificUser, updateProfileController, sellerDetailsController } = require("../controllers/user_controllers/profile_controllers");

const router = require("express").Router();

router.get("/profile", getSpecificUser);
router.put("/update-profile", verifyJWT(), updateProfileController);
router.get("/seller-details", verifyJWT(), sellerDetailsController);


module.exports = router;