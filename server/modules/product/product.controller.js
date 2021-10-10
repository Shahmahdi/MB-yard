const Product = require("./product.model");
const { errorHandler } = require("../helpers/errorHandler");

const list = async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    await Product.find()
      .select("_id name description price imageUrl")
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
      .then((result) => {
        res.status(200).json({
          status: 200,
          data: result,
          message: "Product list fetched successfully."
        });
      });
  } catch (error) {
    errorHandler(res, error);
  }
};

const search = (req, res, next) => {
  try {
    const { name, limit = 10, skip = 0 } = req.query;
    Product.find({ name: new RegExp(name, "i") })
      .select("_id name description price imageUrl")
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
      .then((result) => {
        res.status(200).json({
          status: 200,
          data: result,
          message: "Product list fetched successfully."
        });
      });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { list, search };
