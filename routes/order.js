const express = require("express");
// set up the order router
const router = express.Router();
// import all the order functions
const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

//get orders
router.get("/", async (req, res) => {
  //getOrders from controller (fetches all orders)
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

//get 1 order
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// create new order
router.post("/", async (req, res) => {
  try {
    const {
      customerName = "",
      customerEmail = "",
      products = [],
      totalPrice = 0,
    } = req.body;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice
    );
    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update order (PUT)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    const updatedOrder = await updateOrder(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

//delete order
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOrder(id);
    res.status(200).send({
      message: `Order ${id} deleted!!`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;