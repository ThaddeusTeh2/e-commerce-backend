//loads models
const Product = require("../models/product");

//!funcs (CRUD)
//get all products
const getProducts = async (name, category, page = 1, per_page = 6) => {
  // 1. empty container 4 filter
  let filter = {};
  // name exists ? hawk tuah into container
  if (name) {
    filter.name = name;
  }
  // category exists ? hawk tuah into container
  if (category) {
    filter.category = category;
  }
  // apply filter in .find()
  const products = await Product.find(filter)
    .limit(per_page)
    .skip((page - 1) * per_page)
    .sort({ name: -1 });
  return products;
};

// get 1 product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

//add new prod
const addNewProduct = async (name, description, price, category, image) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    image,
  });
  // save the new product into mongodb
  await newProduct.save();
  return newProduct;
};
//update prod
const updateProduct = async (id, name, description, price, category) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    { new: true } //return updated item
  );
  return updatedProduct;
};

// delete product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

// export all the functions
module.exports = {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
