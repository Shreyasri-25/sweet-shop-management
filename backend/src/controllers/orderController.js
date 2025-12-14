const Order = require("../models/Order");
const Sweet = require("../models/Sweet");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const sweet = await Sweet.findById(item.sweetId);

      if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" });
      }

      if (sweet.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${sweet.name}` });
      }

      // Reduce stock
      sweet.quantity -= item.quantity;
      await sweet.save();

      const itemTotal = sweet.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        sweet: sweet._id,
        name: sweet.name,
        price: sweet.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER ORDER HISTORY
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
