const express = require("express");
const productCtrl = require("./product.controller");

const router = express.Router();

router.route("/").get(productCtrl.list);
router.route('/search')
  .get(productCtrl.search);

module.exports = router;
