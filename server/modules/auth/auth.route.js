const express = require("express");
const authCtrl = require("./auth.controller");
const schemaValidator = require('../helpers/joiSchemaValidator');
const validation = require("./auth.validation");

const router = express.Router();

router.route("/login").post(
    schemaValidator(validation.login),
    authCtrl.login
);

module.exports = router;