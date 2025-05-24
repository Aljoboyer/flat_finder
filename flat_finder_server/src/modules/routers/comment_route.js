const verifyJWT = require("../../middlewares/authChecker");
const { CommentPostController } = require("../controllers/property/comment_controller");
const router = require("express").Router();

router.post("/post", verifyJWT(), CommentPostController);

module.exports = router;