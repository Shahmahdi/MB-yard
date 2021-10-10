const express = require("express");
const authRoutes = require("./modules/auth/auth.route");
const userRoutes = require("./modules/user/user.route");
const productRoutes = require("./modules/product/product.route");
const wishlistRoutes = require("./modules/wishlist/wishlist.route");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/product', productRoutes);
router.use('/wishlist', wishlistRoutes);

module.exports = router;