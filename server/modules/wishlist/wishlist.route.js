const express = require("express");
const wishlistCtrl = require("./wishlist.controller");

const router = express.Router();

router.route("/").get(wishlistCtrl.list);
router.route("/").post(wishlistCtrl.addItemIntoWishlist);
router.route("/:productId").delete(wishlistCtrl.removeItemFromWishlist);

module.exports = router;