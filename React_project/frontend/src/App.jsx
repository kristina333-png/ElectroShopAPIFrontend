import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SiteSettingsProvider } from "./context/SiteSettingsContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
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
import AdminProductsPage from "./pages/AdminProductsPage/AdminProductsPage.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage/AdminOrdersPage.jsx";
import AdminConfiguratorPage from "./pages/AdminConfiguratorPage/AdminConfiguratorPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteSettingsProvider>
          <CartProvider>
            <ToastProvider>
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
                    path="admin/products"
                    element={
                      <AdminRoute>
                        <AdminProductsPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="admin/orders"
                    element={
                      <AdminRoute>
                        <AdminOrdersPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="admin/configurator"
                    element={
                      <AdminRoute>
                        <AdminConfiguratorPage />
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
            </ToastProvider>
          </CartProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
