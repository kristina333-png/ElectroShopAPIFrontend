import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <section className="admin-dashboard">
      <SectionHeader
        title="Панель администратора"
        subtitle={`Вы вошли как ${user?.email} (${user?.role})`}
      />

      <div className="admin-dashboard__grid">
        <div className="admin-dashboard__card">
          <h3>Товары и картинки</h3>
          <p>Загрузка картинок и управление каталогом.</p>
          <Link to="/admin/products" className="admin-dashboard__button">
            Управлять товарами
          </Link>
        </div>

        <div className="admin-dashboard__card">
          <h3>Добавить товар</h3>
          <p>Новая позиция в каталоге с картинкой.</p>
          <Link to="/products/new" className="admin-dashboard__button">
            Добавить товар
          </Link>
        </div>

        <div className="admin-dashboard__card">
          <h3>Управление заказами</h3>
          <p>Все заказы, смена статусов и создание заказа для клиента.</p>
          <Link to="/admin/orders" className="admin-dashboard__button">
            Управлять заказами
          </Link>
        </div>

        <div className="admin-dashboard__card">
          <h3>Конфигуратор сайта</h3>
          <p>Название магазина, телефон, адрес, цвета темы и тексты.</p>
          <Link to="/admin/configurator" className="admin-dashboard__button">
            Настроить сайт
          </Link>
        </div>
      </div>

      <button onClick={handleLogout} className="admin-dashboard__logout">
        Выйти из аккаунта
      </button>
    </section>
  );
}
