import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./Navigation.css";

const LINKS = [
  { to: "/", label: "Главная", end: true },
  { to: "/catalog", label: "Каталог" },
  { to: "/cart", label: "Корзина" },
  { to: "/orders", label: "Мои заказы" },
];

export default function Navigation() {
  const { user } = useContext(AuthContext);

  // «Конфигуратор» сайта доступен только администратору.
  const links =
    user?.role === "Admin"
      ? [...LINKS, { to: "/admin/configurator", label: "Конфигуратор" }]
      : LINKS;

  return (
    <nav className="navigation" aria-label="Основная навигация">
      <div className="navigation__inner">
        {links.map((link) => (
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
