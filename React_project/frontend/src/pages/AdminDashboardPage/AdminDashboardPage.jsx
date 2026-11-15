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
          <h3>Управление каталогом</h3>
          <p>Добавление новых товаров.</p>
          <Link to="/products/new" className="admin-dashboard__button">
            Добавить новый товар
          </Link>
        </div>

        <div className="admin-dashboard__card">
          <h3>Управление заказами</h3>
          <p>Просмотр всех заказов и смена статусов.</p>
          <button disabled className="admin-dashboard__button">
            Все заказы (в разработке)
          </button>
        </div>
      </div>

      <button onClick={handleLogout} className="admin-dashboard__logout">
        Выйти из аккаунта
      </button>
    </section>
  );
}