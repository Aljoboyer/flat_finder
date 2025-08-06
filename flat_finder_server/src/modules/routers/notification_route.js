const verifyJWT = require("../../middlewares/authChecker");
const { getNotificationListController } = require("../controllers/notification_controllers/notification_controllers");

const router = require("express").Router();

router.get("/list", verifyJWT(), getNotificationListController);

module.exports = router;
