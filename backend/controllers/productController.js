const Product = require("../models/Product");

// butun mehsullari goturmek
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // json formatda front a gonderirik
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//id ile 1 mehsul almaq 
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // 🔥 düzəliş burada
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// mehsulu patch etmek - yenilemek
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getProducts,
  getProduct,
  updateProduct, 
};