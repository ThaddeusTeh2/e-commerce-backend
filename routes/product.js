const express = require("express");
//router 4d products
const router = express.Router();

// import func frm controller
const {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
//CRUD
// get all products @ /products (GET)
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const page = req.query.page;
    const per_page = req.query.per_page;
    const category = req.query.category;

    //getProducts from controller (fetches all products)
    const products = await getProducts(name, category, page, per_page);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});
// get 1 product by id (GET)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add 1 product (POST)
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // !err check
    if (!name || !category) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }

    //pass data 2 addProd function
    const newProduct = await addNewProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

// update product (PUT)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete product (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({
      message: `Product ${id} deleted!!`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
