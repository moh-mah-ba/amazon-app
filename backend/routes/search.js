const express = require("express");
const router = express.Router();
const Product = require("../schemas/product");

router.get("/:search", async (req, res) => {
  const productsSearch = await Product.find({
    name: { $regex: req.params.search, $options: "si" },
  });
  if (productsSearch) {
   return  res.send(productsSearch);
  } else {
    return res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = router;
