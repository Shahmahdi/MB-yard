const express = require("express");
const wishlistCtrl = require("./wishlist.controller");
const schemaValidator = require("../helpers/joiSchemaValidator");
const validation = require("./wishlist.validation");

const router = express.Router();

router.route("/").get(wishlistCtrl.list);
router
  .route("/")
  .post(
    schemaValidator(validation.addItemToWishlist),
    wishlistCtrl.addItemIntoWishlist
  );
router.route("/:productId").delete(wishlistCtrl.removeItemFromWishlist);

module.exports = router;
