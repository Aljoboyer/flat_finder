const verifyJWT = require("../../middlewares/authChecker");
const { messageAddController, getMessagesContoller, getConversationListCotroller, markMessagesAsReadController, getPendingMessageCountCtrl } = require("../controllers/msg_controllers/msg_controllers");

const router = require("express").Router();

router.post("/sent", verifyJWT(), messageAddController);
router.get("/messages", verifyJWT(), getMessagesContoller);
router.get("/conversation-lists", verifyJWT(), getConversationListCotroller);
router.get("/mark-read", verifyJWT(), markMessagesAsReadController);
router.get("/unread", verifyJWT(), getPendingMessageCountCtrl);

module.exports = router;
