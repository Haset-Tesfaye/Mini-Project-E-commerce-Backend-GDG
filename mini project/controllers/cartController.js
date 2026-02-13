const Cart = require("../models/cart");
const Product = require("../models/products");

// GET cart
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST cart 

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (quantity > product.stock)
      return res.status(400).json({ error: "Not enough stock" });

    // Check if already in cart
    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stock)
        return res.status(400).json({ error: "Exceeds stock" });
    } else {
      cartItem = new Cart({ productId, quantity });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// PUT cart 

exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (quantity > product.stock)
      return res.status(400).json({ error: "Not enough stock" });

    const cartItem = await Cart.findOne({ productId });
    if (!cartItem) return res.status(404).json({ error: "Item not in cart" });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ success: true, data: cartItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



// DELETE cart by id
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({ productId });
    if (!cartItem) return res.status(404).json({ error: "Item not in cart" });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
