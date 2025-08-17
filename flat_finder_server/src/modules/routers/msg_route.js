const verifyJWT = require("../../middlewares/authChecker");
const { messageAddController, getMessagesContoller, getConversationListCotroller } = require("../controllers/msg_controllers/msg_controllers");

const router = require("express").Router();

router.post("/sent", verifyJWT(), messageAddController);
router.get("/messages", verifyJWT(), getMessagesContoller);
router.get("/conversation-lists", verifyJWT(), getConversationListCotroller);

module.exports = router;
