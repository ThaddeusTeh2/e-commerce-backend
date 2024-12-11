const Product = require("../models/product");

const getCategories = async () => {
  //get all products
  const products = await Product.find();

  //container
  let categories = [];

  //go through all the categories in all products
  products.forEach((product) => {
    //if find a duplicate category, ignore
    if (!categories.includes(product.category)) {
      //push new arr with only unique categories
      categories.push(product.category);
    }
  });
  return categories;
};

module.exports = {
  getCategories,
};
