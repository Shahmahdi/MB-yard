const User = require("./user.model");
const validationSchema = require("./user.validation");

const create = (req, res, next) => {
  console.log(`====================================`, req.body);

  return res.status(200).json({ message: "User created successfully." });
};

module.exports = { create };
