const { signUpController, loginController, resetLinkController } = require("../controllers/auth_controllers/auth_controller");

const router = require("express").Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/send-reset-link", resetLinkController);

module.exports = router;
