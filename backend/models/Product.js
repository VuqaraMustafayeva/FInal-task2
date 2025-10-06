const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ram: { type: String },
    storage: { type: String },
    size: { type: String },
    gpu: { type: String },
  description: { type: String },
  image: { type: String }
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
