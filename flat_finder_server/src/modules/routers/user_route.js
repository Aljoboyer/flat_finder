const verifyJWT = require("../../middlewares/authChecker");
const { ConnectionController, followCheckController, 
    getAllFollowController, UnfollowController } = require("../controllers/user_controllers/follow_controllers");
const { getSpecificUser, updateProfileController, 
    sellerDetailsController, changePasswordController } = require("../controllers/user_controllers/profile_controllers");

const router = require("express").Router();

router.get("/profile", getSpecificUser);
router.put("/update-profile", verifyJWT(), updateProfileController);
router.get("/seller-details", verifyJWT(), sellerDetailsController);
router.post("/follow", verifyJWT(), ConnectionController);
router.put("/password-change", verifyJWT(), changePasswordController);
router.post("/check-follow", verifyJWT(), followCheckController);
router.get("/all-follow", verifyJWT(), getAllFollowController);
router.put("/un-follow", verifyJWT(), UnfollowController);

module.exports = router;