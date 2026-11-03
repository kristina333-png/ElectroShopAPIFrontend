import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <Navigation />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
