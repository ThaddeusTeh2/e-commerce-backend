const axios = require("axios");
// import the Order model
const Order = require("../models/order");

// get all the orders
const getOrders = async () => {
  const orders = await Order.find();
  return orders;
};

// get one order
const getOrder = async (_id) => {
  const order = await Order.findById(_id);
  return order;
};

// add new order
const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  // 1. create a bill in billplz
  const billplzResponse = await axios.post(
    "https://www.billplz-sandbox.com/api/v3/bills",
    {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: "SAMBUBU",
      name: customerName,
      email: customerEmail,
      amount: totalPrice * 100,
      callback_url: "http://localhost:3000/verify-payment",
      redirect_url: "http://localhost:3000/verify-payment",
    },
    {
      auth: {
        username: process.env.BILLPLZ_SECRET_KEY,
        password: "",
      },
    }
  );
  // 2. retrieve the billplz_url and billplz_id
  const billplz_id = billplzResponse.data.id;
  const billplz_url = billplzResponse.data.url;

  // 3. create a new order (put in the billplz_id into the order)
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    billplz_id,
  });
  await newOrder.save();

  // 4. return the new order with the billplz_url
  return {
    ...newOrder,
    billplz_url,
  };
};

// update order
const updateOrder = async (_id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    _id,
    { status },
    { new: true } //return updated item
  );
  return updatedOrder;
};

// delete order
const deleteOrder = async (_id) => {
  return await Order.findByIdAndDelete(_id);
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
