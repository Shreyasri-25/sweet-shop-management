import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import Sweets from "./pages/Sweets";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";
import AdminOrders from "./pages/AdminOrders";
import MyOrders from "./pages/MyOrders";


export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />


        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sweets"
          element={
            <ProtectedRoute>
              <Sweets />
            </ProtectedRoute>
          }
        />
        
<Route path="/my-orders" element={<MyOrders />} />

      </Routes>
    </>
  );
}
