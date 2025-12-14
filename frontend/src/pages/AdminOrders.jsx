import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/orders")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Orders 📦</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders placed yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Sweet</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-center">Price</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, orderIndex) =>
                order.items.map((item, itemIndex) => (
                  <motion.tr
                    key={`${order._id}-${itemIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: orderIndex * 0.03 }}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    {/* User Name */}
                    <td className="px-4 py-3">
                      {order.user?.name || "—"}
                    </td>

                    {/* User Email */}
                    <td className="px-4 py-3 text-gray-300">
                      {order.user?.email || "—"}
                    </td>

                    {/* Sweet Name */}
                    <td className="px-4 py-3">
                      {item.sweet?.name || item.name}
                    </td>

                    {/* Sweet Category */}
                    <td className="px-4 py-3 text-gray-300">
                      {item.sweet?.category || "—"}
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-3 text-center">
                      {item.quantity}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-center">
                      ₹{item.price}
                    </td>

                    {/* Total (price × quantity) */}
                    <td className="px-4 py-3 text-center font-medium">
                      ₹{item.price * item.quantity}
                    </td>

                    {/* Order Date */}
                    <td className="px-4 py-3 text-gray-300">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
