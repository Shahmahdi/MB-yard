const express = require("express");
const userRoutes = require("./modules/user/user.route");

const router = express.Router();

router.use('/users', userRoutes);

module.exports = router;