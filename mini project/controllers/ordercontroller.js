const Order = require("../models/orders");
const Cart = require("../models/cart");
const Product = require("../models/products");

// POST orders
exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;

    const cartItems = await Cart.find().populate("productId");
    if (!cartItems.length)
      return res.status(400).json({ error: "Cart is empty" });

    for (let item of cartItems) {
      if (item.quantity > item.productId.stock) {
        return res.status(400).json({
          error: `Not enough stock for ${item.productId.name}`,
        });
      }
    }

    let total = 0;
    const items = cartItems.map((item) => {
      total += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    const order = new Order({
      items,
      total,
      customerName,
      customerEmail,
    });
    await order.save();

    for (let item of cartItems) {
      const product = await Product.findById(item.productId._id);
      product.stock -= item.quantity;
      await product.save();
    }

    await Cart.deleteMany();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET orders id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId",
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
