import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/products.js";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import { formatPrice } from "../../utils/format.js";
import "./OrdersPage.css";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    getMyOrders(user.token)
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <section>
        <SectionHeader title="Мои заказы" subtitle="История покупок" />
        <p style={{ marginTop: '20px' }}>Войдите в аккаунт, чтобы увидеть заказы. <Link to="/login" style={{ color: 'var(--color-primary)' }}>Войти</Link></p>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <SectionHeader title="Мои заказы" subtitle={`История заказов для ${user.email}`} />

      {loading && <p style={{ marginTop: '20px' }}>Загрузка заказов...</p>}
      {error && <p style={{ color: 'var(--color-danger)', marginTop: '20px' }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p style={{ marginTop: '20px' }}>У вас пока нет заказов. <Link to="/catalog" style={{ color: 'var(--color-primary)' }}>Перейти в каталог</Link></p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card__header">
                <span className="order-card__id">Заказ № {order.id.slice(0, 8)}</span>
                <span className="order-card__date">{new Date(order.orderDate).toLocaleDateString()}</span>
              </div>
              <div className="order-card__row">
                <span>Сумма:</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="order-card__row">
                <span>Адрес:</span>
                <span>{order.deliveryAddress}</span>
              </div>
              <div className="order-card__status">
                {order.status === 0 ? "Новый" : order.status === 1 ? "В обработке" : "Выполнен"}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}