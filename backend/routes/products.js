require("dotenv").config();
const express = require("express");
const router = express.Router();
const Product = require("../schemas/product");
const cloudinary = require("cloudinary").v2;
const Joi = require("joi");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get("/", async (req, res) => {
  const url = new URL(req.url, "http://www.example.com");

  let page = url.searchParams.get("page")
    ? Number(url.searchParams.get("page"))
    : 1;

  let itemsPerPage = url.searchParams.get("itemsPerPage")
    ? Number(url.searchParams.get("itemsPerPage"))
    : 3;

  if (page < 1) page = 1;

  const products = await Product.find()
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);
  const totalProducts = await Product.count();
  res.send({
    products,
    totalPages: Math.ceil(totalProducts / itemsPerPage),
    currentItemsPerPage: itemsPerPage,
  });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.post("/addproduct", async (req, res) => {
  const body = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().min(0).required(),
    countInStock: Joi.number().min(1).required(),
    description: Joi.string().required(),
    rating: Joi.number(),
    numReviews: Joi.number(),
  });
  
  const { error } = schema.validate(req.body);
  
  if (error) {
      res.send(error)
  }else{
      const newProduct = new Product({
        name: body.name,
        image: body.image,
        brand: body.brand,
        category: body.category,
        price: Number(body.price),
        countInStock: Number(body.countInStock),
        description: body.description,
        rating: Number(body.rating),
        numReviews: Number(body.numReviews),
    })
      await newProduct.save(); 
      res.send(newProduct)
  }
});

module.exports = router;
 