const express = require("express");
const authRoutes = require("./modules/auth/auth.route");
const userRoutes = require("./modules/user/user.route");
const productRoutes = require("./modules/product/product.route");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/product', productRoutes);

module.exports = router;