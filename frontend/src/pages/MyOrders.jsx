import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/orders/my")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">
        My Orders 🛍️
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Sweet</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-center">Price</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    {order.sweet?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {order.sweet?.category}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-3 text-center">
                    ₹{order.sweet?.price}
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    ₹{order.totalPrice}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
