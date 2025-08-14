const verifyJWT = require("../../middlewares/authChecker");
const { getNotificationListController, updateNotificationCotroller, getNotificationListControllerTest } = require("../controllers/notification_controllers/notification_controllers");

const router = require("express").Router();

router.get("/list", verifyJWT(), getNotificationListController);
router.put("/update", verifyJWT(), updateNotificationCotroller);

router.get("/test", verifyJWT(), getNotificationListControllerTest);

module.exports = router;
