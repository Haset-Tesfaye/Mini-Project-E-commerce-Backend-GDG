const mongoose = require("mongoose");

const productschema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: String,
    imageurl: String,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productschema);

module.exports = Product;
