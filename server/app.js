const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const allRoutes = require("./index.route");
const mongoose = require("mongoose");
const { dbConnectionUrl } = require("./modules/variables/index");

const app = express();

mongoose
  .connect(dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected..");
  }).catch(() => {
    logger.error(`unable to connect to database: ${dbConnectionUrl}`);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", allRoutes);

module.exports = app;
