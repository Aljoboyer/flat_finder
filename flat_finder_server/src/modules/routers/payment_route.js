const verifyJWT = require("../../middlewares/authChecker");
const { paymentIntentController } = require("../controllers/payment_controller/payment_controller");

const router = require("express").Router();

router.post("/create-intent", verifyJWT(), paymentIntentController);
router.post("/complete", verifyJWT(), paymentIntentController);

module.exports = router;