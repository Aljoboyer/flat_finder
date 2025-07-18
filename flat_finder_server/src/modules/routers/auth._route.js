const { signUpController, loginController, resetLinkController, resetPasswordController } = require("../controllers/auth_controllers/auth_controller");

const router = require("express").Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/send-reset-link", resetLinkController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
