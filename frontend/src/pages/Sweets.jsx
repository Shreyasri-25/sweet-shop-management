import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");


  const fetchSweets = async () => {
    try {
      const { data } = await API.get("/sweets");
      setSweets(data);
    } catch {
      toast.error("Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleBuy = async (sweet) => {
    const qty = Number(quantities[sweet._id]);

    if (!qty || qty <= 0) {
      return toast.error("Enter valid quantity");
    }

    if (qty > sweet.quantity) {
      return toast.error("Not enough stock");
    }

    try {
      await API.post("/orders", {
        items: [
          {
            sweetId: sweet._id,
            quantity: qty,
          },
        ],
      });

      toast.success("Order placed successfully 🍬");
      setQuantities((prev) => ({ ...prev, [sweet._id]: "" }));
      fetchSweets();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(search.toLowerCase()) ||
    sweet.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24">
      <h1 className="text-3xl font-bold mb-8">Available Sweets 🍭</h1>
      {/* Search bar */}
      <div className="mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search sweets by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSweets.map((sweet) => {
          const qty = quantities[sweet._id] || "";
          const total = qty ? qty * sweet.price : 0;

          return (
            <motion.div
              key={sweet._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/10"
            >
              <h2 className="text-xl font-semibold">{sweet.name}</h2>

              <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-teal-500/20 text-teal-300">
                {sweet.category}
              </span>

              <p className="mt-2 text-lg">₹{sweet.price}</p>
              <p className="text-sm text-gray-300">
                Stock: {sweet.quantity}
              </p>

              <input
                type="number"
                min="1"
                max={sweet.quantity}
                placeholder="Quantity"
                value={qty}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [sweet._id]: e.target.value,
                  })
                }
                className="mt-4 w-full p-2 rounded bg-white/5 border border-white/10"
              />

              {qty && (
                <p className="mt-2 text-sm text-teal-400">
                  Total: ₹{total}
                </p>
              )}

              <button
                onClick={() => handleBuy(sweet)}
                className="mt-4 w-full bg-gradient-to-r from-teal-400 to-violet-500 text-black py-2 rounded-lg font-semibold"
              >
                Buy Now
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
