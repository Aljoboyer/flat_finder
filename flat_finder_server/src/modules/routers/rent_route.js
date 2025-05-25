const verifyJWT = require("../../middlewares/authChecker");
const { RentRequestController, getAllRentReqController } = require("../controllers/rent_controllers/rent_controllers");

const router = require("express").Router();

router.post("/request", verifyJWT(), RentRequestController);
router.get("/req-list", verifyJWT(), getAllRentReqController);

module.exports = router;
