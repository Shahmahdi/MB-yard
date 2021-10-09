const express = require("express");
const userCtrl = require("./user.controller");
const schemaValidator = require('../helpers/joiSchemaValidator');
const validation = require("./user.validation");

const router = express.Router();

router.route("/").post(
    schemaValidator(validation.register), 
    userCtrl.create
);

module.exports = router;