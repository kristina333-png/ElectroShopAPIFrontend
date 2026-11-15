import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/products.js";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import { formatPrice } from "../../utils/format.js";
import { getOrderStatus, formatOrderNumber } from "../../utils/orders.js";
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

    let cancelled = false;
    setLoading(true);

    getMyOrders(user.token)
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) {
    return (
      <section>
        <SectionHeader title="Мои заказы" subtitle="История покупок" />
        <StateMessage tone="info" title="Нужен вход" text="Войдите в аккаунт, чтобы увидеть заказы.">
          <Link to="/login">Войти</Link>
        </StateMessage>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <SectionHeader title="Мои заказы" subtitle={`История заказов для ${user.email}`} />

      {loading && <p className="orders-page__state">Загрузка заказов...</p>}
      {error && <StateMessage tone="error" title="Ошибка" text={error} />}

      {!loading && !error && orders.length === 0 && (
        <StateMessage tone="info" title="Заказов пока нет" text="Оформите первый заказ из каталога.">
          <Link to="/catalog">Перейти в каталог</Link>
        </StateMessage>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => {
            const status = getOrderStatus(order.status);
            return (
              <article key={order.id} className="order-card">
                <div className="order-card__header">
                  <span className="order-card__id">Заказ № {formatOrderNumber(order.id)}</span>
                  <span className="order-card__date">
                    {new Date(order.orderDate).toLocaleString("ru-RU")}
                  </span>
                </div>

                {(order.items || []).length > 0 && (
                  <ul className="order-card__items">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <span>
                          {item.productName} × {item.quantity}
                        </span>
                        <span>{formatPrice(item.lineTotal)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="order-card__row">
                  <span>Сумма:</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="order-card__row">
                  <span>Адрес:</span>
                  <span>{order.deliveryAddress}</span>
                </div>
                <div className={`order-card__status order-card__status--${status.modifier}`}>
                  {status.label}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
