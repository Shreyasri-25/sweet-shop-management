const Order = require("../models/Order");

exports.getAdminDashboardStats = async (req, res) => {
  try {
    const orders = await Order.find(); // ❌ no populate

    // Total income
    const totalIncome = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    // Today's date start
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

    // Sweet-wise sales today
    const sweetSales = {};

    todayOrders.forEach((order) => {
      if (!Array.isArray(order.items)) return;

      order.items.forEach((item) => {
        if (!item.name) return;

        if (!sweetSales[item.name]) {
          sweetSales[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
        }

        sweetSales[item.name].quantity += item.quantity || 0;
        sweetSales[item.name].revenue +=
          (item.quantity || 0) * (item.price || 0);
      });
    });

    res.json({
      totalIncome,
      todayIncome,
      ordersToday,
      sweetSalesToday: Object.values(sweetSales),
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};
