const _ = require('lodash');

module.exports = (_schema) => {
  const config = { abortEarly: false };

  return (req, res, next) => {
    const { error } = _schema.validate(req.body, config);
    if (error && error.details) {
      const errorMessages = {};
      error.details.map(
        (err) => (errorMessages[err.context.label] = err.message.replace(/['"]/g, ''))
      );
      return res.status(400).json({
        status: 400,
        details: errorMessages,
        message: "Invalid request data. Please check your information and try again.",
      });
    }
    next();
  }
};
