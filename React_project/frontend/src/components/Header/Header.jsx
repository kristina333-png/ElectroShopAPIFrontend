import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          ElectroShop
        </Link>

        <div className="site-header__actions">
          {user?.role === "Admin" && (
            <Link to="/admin" className="site-header__link" style={{ color: "#facc15", fontWeight: "bold" }}>
              Админ-панель
            </Link>
          )}

          <UserInfo /> 
          
          <Link to="/cart" className="site-header__link">
            Корзина
          </Link>
        </div>
      </div>
    </header>
  );
}