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
    console.log(error);
  }
};

const search = (req, res, next) => {
  const searchingValue = req.query.name;
  Product.find({ name: new RegExp(searchingValue, "i")}, function (err, searchedValue) {
    if (err) {
      console.log('Product search error: ',err);
    }
    res.status(200).json(searchedValue);
  });
}

module.exports = { list, search };
