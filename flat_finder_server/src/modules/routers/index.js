const express = require('express');
const router = express.Router();

// Import routers
const authRouter = require('./auth._route');
const uploadRouter = require('./upload');

// Use them with prefixes if needed
router.use('/auth', authRouter);
router.use('/file', uploadRouter);


module.exports = router;
