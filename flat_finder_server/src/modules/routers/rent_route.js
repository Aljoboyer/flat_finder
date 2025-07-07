const verifyJWT = require("../../middlewares/authChecker");
const { RentRequestController, getAllRentReqController, 
    RentRequestActionController, 
    getSpecificRentReqController, 
    getRentBuyHistoryController} = require("../controllers/rent_controllers/rent_controllers");

const router = require("express").Router();

router.post("/request", verifyJWT(), RentRequestController);
router.get("/req-list", verifyJWT(), getAllRentReqController);
router.post("/req-action", verifyJWT(), RentRequestActionController);
router.get("/specific-request", verifyJWT(), getSpecificRentReqController);
router.get("/buy-history", verifyJWT(), getRentBuyHistoryController);

module.exports = router;
