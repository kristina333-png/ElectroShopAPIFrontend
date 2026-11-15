import { Link } from "react-router-dom";
import { useSiteSettings } from "../../context/SiteSettingsContext.jsx";
import "./Footer.css";

export default function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__about">
          <p className="site-footer__logo">
            <span aria-hidden="true">⚡</span> {settings.shopName}
          </p>
          <p className="site-footer__text">{settings.footerText || "Онлайн-магазин электроники."}</p>

          <ul className="site-footer__contacts">
            {settings.phone && (
              <li>
                <span>Телефон:</span>{" "}
                <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a>
              </li>
            )}
            {settings.email && (
              <li>
                <span>Email:</span> <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
            )}
            {settings.address && (
              <li>
                <span>Адрес:</span> {settings.address}
              </li>
            )}
            {settings.workHours && (
              <li>
                <span>Часы работы:</span> {settings.workHours}
              </li>
            )}
          </ul>
        </div>

        <nav className="site-footer__column" aria-label="Каталог">
          <p className="site-footer__heading">Магазин</p>
          <Link to="/catalog">Все товары</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/orders">Мои заказы</Link>
        </nav>

        <nav className="site-footer__column" aria-label="Покупателям">
          <p className="site-footer__heading">Покупателям</p>
          <Link to="/login">Вход и регистрация</Link>
          <a href="http://localhost:5235/swagger" target="_blank" rel="noreferrer">
            Swagger API
          </a>
        </nav>
      </div>

      <p className="site-footer__copyright">
        © {year} {settings.shopName}. Все права защищены.
      </p>
    </footer>
  );
}
