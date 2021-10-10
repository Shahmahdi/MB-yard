const Joi = require("joi");

module.exports = {
  login: Joi.object({
    email: Joi.string()
      .regex(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required()
      .messages({
        "string.pattern.base": `Email is not valid format`
      }),
    password: Joi.string()
      .regex(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base": `Password should contain Uppercase, Lowercase, Special character, Number and minimum 8 characters long.`
      })
  })
};
