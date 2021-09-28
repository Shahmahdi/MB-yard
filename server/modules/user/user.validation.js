const Joi = require("joi");

// const schema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),

//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

//   repeat_password: Joi.ref("password"),

//   phoneNumber: Joi.number().integer(),

//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required(),
// });

// module.exports = schema;

module.exports = {
  register: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .error((error) => {
          return { success: false, message: `Please recheck your name` };
        }),
      email: Joi.string()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .lowercase()
        .required()
        .error((error) => {
          return {
            success: false,
            message: "Email is not valid format",
          };
        }),
      password: Joi.string()
        .regex(
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
        .required()
        .error((error) => {
          return {
            success: false,
            message:
              "Password should contain Uppercase, Lowercase, Special character, Number",
          };
        }),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
      contactNo: Joi.string()
        .regex(/^(\+?(88)?0?1[356789][0-9]{8})$/)
        .required()
        .error((error) => {
          return {
            success: false,
            message: "ContactNo did not match the validation",
          };
        }),
    }),
  }),
};
