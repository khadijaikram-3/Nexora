import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCartStore } from "./stores/useCartStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#080B12] text-white relative overflow-hidden">

      {/* Subtle Cyan Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
            absolute
            top-[-180px]
            left-1/2
            -translate-x-1/2
            w-[900px]
            h-[450px]
            rounded-full
            bg-[radial-gradient(ellipse,rgba(56,189,248,0.08)_0%,rgba(56,189,248,0.03)_45%,transparent_75%)]
            blur-3xl
          "
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Pages */}
      <div className="relative z-10 pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? (
                <AdminPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/category/:category"
            element={<CategoryPage />}
          />

          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/purchase-success"
            element={
              user ? <PurchaseSuccessPage /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/purchase-cancel"
            element={
              user ? <PurchaseCancelPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;