//make schema 4d prod (rule setting)
const { Schema, model } = require("mongoose");
//setup
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

//schema -> model
const Product = model("Product", productSchema);

module.exports = Product; // = "export default" in React
