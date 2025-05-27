const express = require('express');
const router = express.Router();

// Import routers
const authRouter = require('./auth._route');
const uploadRouter = require('./upload');
const propertyRouter = require('./property_route');
const commentRouter = require('./comment_route');
const rentRouter = require('./rent_route');
const userRouter = require('./user_route');
const reviewRouter = require('./review_route');

// Use them with prefixes if needed
router.use('/auth', authRouter);
router.use('/file', uploadRouter);
router.use('/property', propertyRouter);
router.use('/comment', commentRouter);
router.use('/rent', rentRouter);
router.use('/user', userRouter);
router.use('/review', reviewRouter);

module.exports = router;
