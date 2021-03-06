const Category = require("./modules/category/category.model");
const Product = require("./modules/product/product.model");
const categories = require("./modules/category/seedData.json");
const products = require("./modules/product/seedData.json");

const saveCategoryData = async () => {
  for (const categoryName of categories) {
    const category = new Category({
      name: categoryName
    });
    await category.save().catch((error) => console.log(error));
  }
};

const saveProductData = async () => {
  for (const product of products) {
    const category = await Category.find({ name: product.categoryName });
    const newProductObj = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: category[0]._id
    });
    await newProductObj.save().catch((error) => console.log(error));
  }
};

const saveSeedDataToDB = () => {
  try {
    console.log("========= Start seed data manupulate ===========");
    Category.find(async (err, data) => {
      if (err) {
        console.log(error);
        throw {
          status: 500,
          message: "Error occured while save seed data to DDB"
        }
        return;
      }
      if (data.length === 0) {
        console.log("Seed data manupulating...")
        await Product.deleteMany({});
        await Category.deleteMany({});
        await saveCategoryData();
        await saveProductData();
      }
      console.log("========= Finnish seed data manupulate ===========");
    });
  } catch (error) {
    console.log("Error occured while save seed data to DDB");
    console.log(error);
  }
};

module.exports = { saveSeedDataToDB };
