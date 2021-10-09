const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../variables/index");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        status: 404,
        message: "User doesn't exist."
      };
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw {
        status: 401,
        message: "Authentication failed"
      };
    }
    const token = jwt.sign({ userId: user._id, email }, jwtSecret, {
      expiresIn: "1h"
    });
    res.status(200).json({
      status: 200,
      data: { token }
    });
  } catch (error) {
    res.status(error.status).json(error);
  }
};

module.exports = { login };
