const express = require("express");
const userCtrl = require("./user.controller");
// const schemaValidator = require('../helpers/joiSchemaValidator');
// const paramValidation = require("./user.validation");

const router = express.Router();

router.route("/").post(
    // schemaValidator(paramValidation.register), 
    userCtrl.create);

module.exports = router;