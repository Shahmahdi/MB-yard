const User = require("./user.model");
const validationSchema = require("./user.validation");

const create = (req, res, next) => {
  const { error, value } = validationSchema.register.validate(
    { name: "123", password: "", email: "" },
    { abortEarly: false }
  );
  console.log("error: ", JSON.stringify(error, null, 2));
  if (error) {
    const errorMessages = {};
    error.details.map(
      (err) => (errorMessages[err.context.label] = err.message)
    );
    return res
      .status(400)
      .json({
        details: errorMessages,
        message: "Error occured while creating a new user.",
      });
  }

  return res.status(200).json({ message: "User created successfully." });
};

module.exports = { create };
