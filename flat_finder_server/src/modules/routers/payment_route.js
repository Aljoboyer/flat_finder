const verifyJWT = require("../../middlewares/authChecker");
const { paymentIntentController, paymentController } = require("../controllers/payment_controller/payment_controller");

const router = require("express").Router();

router.post("/create-intent", verifyJWT(), paymentIntentController);
router.post("/complete", verifyJWT(), paymentController);

module.exports = router;