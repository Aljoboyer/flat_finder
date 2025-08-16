const verifyJWT = require("../../middlewares/authChecker");
const { messageAddController } = require("../controllers/msg_controllers/msg_controllers");

const router = require("express").Router();

router.post("/sent", verifyJWT(), messageAddController);

module.exports = router;
