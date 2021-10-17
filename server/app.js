const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const allRoutes = require("./index.route");
const mongoose = require("mongoose");
const { dbConnectionUrl, loadSeedData } = require("./modules/variables/index");
const { saveSeedDataToDB } = require("./loadSeedData");
const isAuth = require('./middlewares/authenticator');

const app = express();

mongoose
  .connect(dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected..");
    if (loadSeedData) {
      saveSeedDataToDB();
    }
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static('images'));
// http://localhost:4000/images/laptop/macbookPro.png

app.use(isAuth);

app.use("/api/v1", allRoutes);

module.exports = app;
