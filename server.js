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
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

//!server start
app.listen(5555, () => {
  console.log("Running @ http://localhost:5555");
});
