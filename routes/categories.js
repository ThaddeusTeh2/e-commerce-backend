const express = require("express");
const router = express.Router();

const { getCategories } = require("../controllers/categories");

router.get("/", async (res, req) => {
  try {
    const categories = await getCategories();
    res.status(200).send(genres);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
