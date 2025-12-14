import { useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../services/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = (path) =>
    `text-sm transition ${
      location.pathname === path
        ? "text-teal-400 font-medium"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-teal-400 cursor-pointer"
      >
        🍬 Sweet Shop
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <button onClick={() => navigate("/")} className={linkClass("/")}>
          Dashboard
        </button>

        <button
          onClick={() => navigate("/sweets")}
          className={linkClass("/sweets")}
        >
          Sweets
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className={linkClass("/admin")}
          >
            Admin
          </button>
        )}

        {isAdmin && (
          <button
            onClick={() => navigate("/admin/orders")}
            className={linkClass("/admin/orders")}
          >
            Orders
          </button>
        )}

        



        {/* <span className="text-gray-400 text-sm hidden sm:block">
          Hi, <span className="text-white">{user?.name || "User"}</span>
        </span> */}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
