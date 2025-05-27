const verifyJWT = require("../../middlewares/authChecker");
const { reviewPostController } = require("../controllers/review_controllers/review_controllers");

const router = require("express").Router();

router.post("/post", verifyJWT(), reviewPostController);

module.exports = router;