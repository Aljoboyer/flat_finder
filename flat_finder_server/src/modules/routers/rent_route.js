const verifyJWT = require("../../middlewares/authChecker");
const { RentRequestController, getAllRentReqController, 
    RentRequestActionController, 
    getSpecificRentReqController } = require("../controllers/rent_controllers/rent_controllers");

const router = require("express").Router();

router.post("/request", verifyJWT(), RentRequestController);
router.get("/req-list", verifyJWT(), getAllRentReqController);
router.post("/req-action", verifyJWT(), RentRequestActionController);
router.get("/specific-request", verifyJWT(), getSpecificRentReqController);

module.exports = router;
