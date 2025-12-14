import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminStats, setAdminStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?.role === "admin") {
      setIsAdmin(true);

      API.get("/admin/dashboard")
        .then(({ data }) => setAdminStats(data))
        .catch(() => setAdminStats(null));
    } else {
      API.get("/orders/my")
        .then(({ data }) => setOrders(Array.isArray(data) ? data : []))
        .catch(() => setOrders([]));
    }
  }, []);

  /* ================= USER DASHBOARD ================= */
  if (!isAdmin && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Your order history
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <p className="text-gray-400">
            You haven’t placed any orders yet.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-5"
              >
                <p className="text-sm text-gray-400">
                  Order ID: {order._id}
                </p>

                <ul className="mt-2 text-sm space-y-1">
                  {Array.isArray(order.items) &&
                    order.items.map((item, idx) => (
                      <li key={idx}>
                        🍬 {item.name} × {item.quantity}
                      </li>
                    ))}
                </ul>

                <div className="mt-3 flex justify-between text-sm">
                  <span>Total: ₹{order.totalAmount}</span>
                  <span className="text-gray-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ================= ADMIN LOADING ================= */
  if (isAdmin && !adminStats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  /* ================= ADMIN DASHBOARD ================= */
  if (isAdmin && adminStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard 📊
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Income" value={`₹${adminStats.totalIncome}`} />
          <StatCard title="Today’s Income" value={`₹${adminStats.todayIncome}`} />
          <StatCard title="Orders Today" value={adminStats.ordersToday} />
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          Sweet Sales Today 🍬
        </h2>

        {adminStats.sweetSalesToday?.length === 0 ? (
          <p className="text-gray-400">No sales today.</p>
        ) : (
          <div className="overflow-x-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="bg-white/10 text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Sweet</th>
                  <th className="px-4 py-3 text-center">Qty Sold</th>
                  <th className="px-4 py-3 text-center">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {adminStats.sweetSalesToday.map((sweet) => (
                  <tr
                    key={sweet.name}
                    className="border-t border-white/10"
                  >
                    <td className="px-4 py-3">{sweet.name}</td>
                    <td className="px-4 py-3 text-center">
                      {sweet.quantity}
                    </td>
                    <td className="px-4 py-3 text-center font-medium">
                      ₹{sweet.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </motion.div>
  );
}
