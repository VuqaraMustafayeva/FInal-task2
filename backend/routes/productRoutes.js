// ultra ultra yeni final
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { getProducts, getProduct, updateProduct,} = require("../controllers/productController");


// mehsul elave etmek
router.post("/", async (req, res) => {
  try {
    const { name, price, ram, storage, size, gpu, description, image } = req.body;

    const newProduct = new Product({
      name,
      price,
      ram,
      storage,
      size,
      gpu,
      description,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// productu silmek
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// butun mehsullari getirmek
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.get("/", getProducts);
router.get("/:id", getProduct); 
router.patch("/:id", updateProduct);

module.exports = router;
