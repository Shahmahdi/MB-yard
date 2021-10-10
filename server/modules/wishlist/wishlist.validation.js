const Joi = require("joi");

module.exports = {
  addItemToWishlist: Joi.object({
    productId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": `Product id is not valid format`
      })
  })
};
