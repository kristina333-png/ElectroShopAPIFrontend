import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__about">
          <p className="site-footer__logo">
            <span aria-hidden="true">⚡</span> ElectroShop
          </p>
          <p className="site-footer__text">
            Учебный проект: клиентская часть на React и серверная часть на
            ASP.NET Core Web API (ElectroShopAPI).
          </p>
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
        © {new Date().getFullYear()} ElectroShop. Проектная деятельность, этап 3.
      </p>
    </footer>
  );
}
