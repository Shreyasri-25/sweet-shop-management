import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/api";
import AuthLayout from "../layouts/AuthLayout";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-white"
      >
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center">
          Create Account 🍬
        </h2>
        <p className="text-center text-gray-400 mt-2 mb-6">
          Register to continue
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password with Eye Icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-12 rounded-lg bg-white/5 border border-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                /* EYE OFF */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8" />
                  <path d="M1 1l22 22" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.9 21.9 0 0 1-5.06 6.94" />
                </svg>
              ) : (
                /* EYE */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-violet-500 text-black py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400">
            Login
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
