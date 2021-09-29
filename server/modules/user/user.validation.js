const Joi = require("joi");

module.exports = {
  register: Joi.object({
    name: Joi.string().required().messages({
      "any.only": "qwerqwer"
    }),
    email: Joi.string()
      .regex(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required()
      .messages({
        "string.pattern.base": `Email is not valid format`,
        "string.lowercase": "asdf"
      }),
    password: Joi.string()
      .regex(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base": `Password should contain Uppercase, Lowercase, Special character, Number`,
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": `Password and confirm password didn't match`,
      }),
    phone: Joi.string()
      .regex(/^(\+?(88)?0?1[356789][0-9]{8})$/)
      .required()
      .messages({
        "string.pattern.base": `Phone number didn't match the validation`,
      }),
  })
};
