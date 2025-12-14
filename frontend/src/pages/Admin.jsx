import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { SWEET_CATEGORIES } from "../constants/categories";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editingId, setEditingId] = useState(null);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/sweets/${editingId}`, form);
        toast.success("Sweet updated ✏️");
      } else {
        await API.post("/sweets", form);
        toast.success("Sweet added 🍭");
      }

      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
      });
      setEditingId(null);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const editHandler = (sweet) => {
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
    setEditingId(sweet._id);
  };

  const deleteHandler = async (id) => {
    try {
      await API.delete(`/sweets/${id}`);
      toast.success("Sweet deleted 🗑️");
      fetchSweets();
    } catch {
      toast.error("Delete failed");
    }
  };

  const restockHandler = async (id) => {
    try {
      await API.post(`/sweets/${id}/restock`, { quantity: 10 });
      toast.success("Restocked +10 📦");
      fetchSweets();
    } catch {
      toast.error("Restock failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Admin Panel 🍬</h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={submitHandler}
        className="bg-white/10 backdrop-blur-xl rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          placeholder="Sweet Name"
          className="p-2 rounded bg-white/5 border border-white/10"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="p-2 rounded bg-white/5 border border-white/10 text-white"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {SWEET_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="text-black">
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          className="p-2 rounded bg-white/5 border border-white/10"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          className="p-2 rounded bg-white/5 border border-white/10"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <button className="md:col-span-4 bg-gradient-to-r from-teal-400 to-violet-500 text-black py-2 rounded-lg font-semibold">
          {editingId ? "Update Sweet" : "Add Sweet"}
        </button>
      </form>

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <motion.div
            key={sweet._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-xl p-5 rounded-xl border border-white/10"
          >
            <h2 className="text-xl font-semibold">{sweet.name}</h2>

            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-teal-500/20 text-teal-300">
              {sweet.category}
            </span>

            <p className="mt-2">₹ {sweet.price}</p>
            <p className="text-sm text-gray-300">
              Stock: {sweet.quantity}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => editHandler(sweet)}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteHandler(sweet._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>

              <button
                onClick={() => restockHandler(sweet._id)}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
              >
                +10
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
