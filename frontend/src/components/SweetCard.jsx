import { useState } from "react";
import { motion } from "framer-motion";
import { getUser } from "../services/auth";

export default function SweetCard({ sweet, onPurchase }) {
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const [qty, setQty] = useState(1);
  const totalPrice = sweet.price * qty;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg"
    >
      <h3 className="text-xl font-semibold">{sweet.name}</h3>

      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-teal-500/20 text-teal-300">
        {sweet.category}
      </span>

      <p className="mt-3 text-sm">
        💰 Price: ₹{sweet.price}
      </p>

      {/* ADMIN ONLY: stock visibility */}
      {isAdmin && (
        <p className="text-sm text-gray-400">
          📦 Stock: {sweet.quantity}
        </p>
      )}

      {/* USER ONLY: purchase section */}
      {!isAdmin && (
        <>
          <div className="mt-3 flex items-center gap-3">
            <label className="text-sm text-gray-300">Qty:</label>
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 px-2 py-1 rounded bg-white/5 border border-white/10 text-white"
            />
          </div>

          <p className="mt-2 text-sm text-gray-300">
            Total:{" "}
            <span className="text-white font-semibold">
              ₹{totalPrice}
            </span>
          </p>

          <button
            onClick={() => onPurchase(sweet._id, qty)}
            className="mt-4 w-full py-2 rounded-lg font-medium bg-gradient-to-r from-teal-400 to-violet-500 text-black hover:opacity-90"
          >
            Buy Now
          </button>
        </>
      )}

      
    </motion.div>
  );
}
