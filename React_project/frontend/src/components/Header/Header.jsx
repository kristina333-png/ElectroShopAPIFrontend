import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useSiteSettings } from "../../context/SiteSettingsContext.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AuthContext);
  const { settings } = useSiteSettings();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          <span className="site-header__logo-mark" aria-hidden="true">⚡</span>
          <span className="site-header__logo-text">
            <span className="site-header__logo-name">{settings.shopName}</span>
            <span className="site-header__tagline">
              {settings.workHours || "Онлайн-магазин электроники"}
            </span>
          </span>
        </Link>

        <div className="site-header__actions">
          {settings.phone && (
            <a
              href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
              className="site-header__link"
            >
              {settings.phone}
            </a>
          )}

          {user?.role === "Admin" && (
            <>
              <Link
                to="/admin"
                className="site-header__link"
                style={{ color: "#facc15", fontWeight: "bold" }}
              >
                Админ-панель
              </Link>
              <Link to="/admin/configurator" className="site-header__link">
                Конфигуратор
              </Link>
            </>
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
