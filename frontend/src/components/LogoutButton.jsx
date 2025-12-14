import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}
