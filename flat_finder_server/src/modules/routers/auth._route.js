const { signUpController, loginController } = require("../controllers/auth_controller");

const router = require("express").Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports = router;
