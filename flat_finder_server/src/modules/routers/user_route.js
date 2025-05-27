const { getSpecificUser } = require("../controllers/user_controllers/profile_controllers");

const router = require("express").Router();

router.get("/profile", getSpecificUser);

module.exports = router;