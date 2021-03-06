require('dotenv').config();

const dbConnectionUrl = process.env.DB_CONNECTION_URL;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_LOGIN_SECRET;

const loadSeedData = true;

module.exports = {
  dbConnectionUrl,
  port,
  jwtSecret,
  loadSeedData
};