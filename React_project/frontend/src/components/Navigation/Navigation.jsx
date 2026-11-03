import { NavLink } from "react-router-dom";
import "./Navigation.css";

const LINKS = [
  { to: "/", label: "Главная", end: true },
  { to: "/catalog", label: "Каталог" },
  { to: "/cart", label: "Корзина" },
  { to: "/orders", label: "Мои заказы" },
];

export default function Navigation() {
  return (
    <nav className="navigation" aria-label="Основная навигация">
      <div className="navigation__inner">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
