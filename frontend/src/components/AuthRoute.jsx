import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export default function AuthRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
