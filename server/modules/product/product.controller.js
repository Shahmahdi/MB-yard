const Product = require("./product.model");

const list = async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    await Product.find()
      .select("_id name price imageUrl")
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

const search = (req, res, next) => {
  try {
    const searchingValue = req.query.name;
    Product.find(
      { name: new RegExp(searchingValue, "i") },
      function (err, searchedValue) {
        if (err) {
          console.log("Product search error: ", err);
        }
        res.status(200).json(searchedValue);
      }
    );
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

module.exports = { list, search };
