require("dotenv").config();
//import express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//make express app
const app = express();

// middleware handles JSON rq
app.use(express.json());
//cors setup
app.use(cors());
//connect 2 db
mongoose
  .connect("mongodb://localhost:27017/ecom")
  .then(() => {
    console.log("Connected 2 mongodb :D");
  })
  .catch((error) => {
    console.log(error + "Code is messed up somewhere >:(");
  });
//root
app.get("/", (req, res) => {
  res.send("Initialized");
});
//TODO import all routes
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/categories");
const orderRouter = require("./routes/order");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));

//!server start
app.listen(5555, () => {
  console.log("Running @ http://localhost:5555");
  console.log(process.env);
});
