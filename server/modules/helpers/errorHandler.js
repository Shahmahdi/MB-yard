const errorHandler = (res, error) => {
  if (error.status) {
    res.status(error.status).json(error);
    return;
  }
  return res.status(500).json({
    status: 500,
    message: "Something went wrong. Please try again later."
  });
};

module.exports = { errorHandler };
