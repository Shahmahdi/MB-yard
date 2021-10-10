const Wishlist = require("./wishlist.model");
const { errorHandler } = require("../helpers/errorHandler");

const list = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      throw {
        status: 401,
        message: "User is not authorized."
      };
    }
    const userId = req.userId;
    await Wishlist.find({ user: userId })
      .select("product")
      .populate("product", "name price imageUrl")
      .sort({ createdAt: -1 })
      .exec()
      .then((wishlist) => {
        const products = wishlist.map((w) => w.product);
        res.status(200).json({
          status: 200,
          data: products,
          message: "Wish list fetched successfully."
        });
      });
  } catch (error) {
    errorHandler(res, error);
  }
};

const addItemIntoWishlist = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      throw {
        status: 401,
        message: "User is not authorized."
      };
    }
    const userId = req.userId;
    const { productId } = req.body;
    const wishProduct = await Wishlist.findOne({
      user: userId,
      product: productId
    });
    if (wishProduct) {
      res.status(201).json({
        status: 201,
        message: "Product has been added to wishlist successfully."
      });
      return;
    }
    const newWish = new Wishlist({
      user: userId,
      product: productId
    });
    newWish.save().then((addedWish) => {
      res.status(201).json({
        status: 201,
        message: "Product has been added to wishlist successfully."
      });
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const removeItemFromWishlist = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      throw {
        status: 401,
        message: "User is not authorized."
      };
    }
    const productId = req.params.productId;
    const userId = req.userId;
    const wishItem = await Wishlist.findOne({
      user: userId,
      product: productId
    });
    if (wishItem) {
      Wishlist.findByIdAndRemove({ _id: wishItem._id })
        .exec()
        .then((item) => {
          res.status(200).json({
            status: 200,
            message: "Product has been deleted from wishlist successfully."
          });
        });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { list, addItemIntoWishlist, removeItemFromWishlist };
