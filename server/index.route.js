const express = require("express");
const authRoutes = require("./modules/auth/auth.route");
const userRoutes = require("./modules/user/user.route");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;