// routes/categories.js
const express = require("express");
const router = express.Router();

const { getCategories } = require("../controllers/categories");

router.get("/", async (req, res) => {
  try {
    const category = await getCategories();
    res.status(200).json(category);
  } catch (err) {
    res.status(400).send({ error: "Error fetching category: " + err.message });
  }
});

module.exports = router;
