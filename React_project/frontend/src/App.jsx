import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ProductCreatePage from "./pages/ProductCreatePage/ProductCreatePage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Клиентские маршруты */}
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="catalog/:id" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Админские маршруты (только для Admin) */}
              <Route 
                path="admin" 
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                } 
              />
              <Route 
                path="products/new" 
                element={
                  <AdminRoute>
                    <ProductCreatePage />
                  </AdminRoute>
                } 
              />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}