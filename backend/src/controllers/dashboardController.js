const Order = require("../models/Order");

exports.getAdminDashboard = async (req, res) => {
  try {
    const orders = await Order.find();

    // ✅ Total income
    const totalIncome = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    // ✅ Today's date start
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = orders.filter(
      (order) => order.createdAt && order.createdAt >= today
    );

    const todayIncome = todayOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    const ordersToday = todayOrders.length;

    // ✅ Sweet-wise sales today
    const sweetSalesMap = {};

    todayOrders.forEach((order) => {
      if (!Array.isArray(order.items)) return;

      order.items.forEach((item) => {
        if (!item.name) return;

        if (!sweetSalesMap[item.name]) {
          sweetSalesMap[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
        }

        sweetSalesMap[item.name].quantity += item.quantity || 0;
        sweetSalesMap[item.name].revenue +=
          (item.quantity || 0) * (item.price || 0);
      });
    });

    res.json({
      totalIncome,
      todayIncome,
      ordersToday,
      sweetSalesToday: Object.values(sweetSalesMap),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Dashboard calculation failed" });
  }
};
