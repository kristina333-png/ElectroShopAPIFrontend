import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      {/* Ваш логотип */}
      <Link to="/" className="site-header__logo">
        ElectroShop
      </Link>

      {/* Ссылки справа */}
      <div className="site-header__actions">
        <Link to="/login">Войти</Link>
        <Link to="/cart">
          Корзина (0)
        </Link>
      </div>
    </header>
  );
}