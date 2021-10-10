const User = require("./user.model");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const create = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw {
        status: 409,
        message: "User already exists."
      };
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });
    newUser.save().then((createdUser) => {
      res.status(201).json({
        status: 201,
        data: {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          phone: createdUser.phone
        },
        message: "User has been created successfully."
      });
    });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again later."
      });
    }
  }
};

module.exports = { create };
