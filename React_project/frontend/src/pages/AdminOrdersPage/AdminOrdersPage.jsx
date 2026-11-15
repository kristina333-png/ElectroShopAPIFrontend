import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import { getAllOrders, updateOrderStatus, createAdminOrder, getUsers } from "../../api/admin.js";
import { getProducts } from "../../api/products.js";
import { formatPrice } from "../../utils/format.js";
import { getOrderStatus, formatOrderNumber } from "../../utils/orders.js";
import "./AdminOrdersPage.css";

const STATUS_OPTIONS = [
  { value: 0, label: "Новый" },
  { value: 1, label: "В обработке" },
  { value: 2, label: "Отправлен" },
  { value: 3, label: "Доставлен" },
  { value: 4, label: "Отменён" },
];

export default function AdminOrdersPage() {
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();
  const token = user?.token;

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [clientId, setClientId] = useState("");
  const [address, setAddress] = useState("");
  const [lines, setLines] = useState([{ productId: "", quantity: 1 }]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadAll() {
    setLoading(true);
    setError("");
    try {
      const [ordersData, usersData, productsData] = await Promise.all([
        getAllOrders(token),
        getUsers(token),
        getProducts({ pageSize: 200 }),
      ]);
      setOrders(ordersData || []);
      setUsers(usersData || []);
      setProducts(productsData || []);
      setClientId((prev) => prev || usersData?.[0]?.id || "");
    } catch (err) {
      setError(err.message || "Не удалось загрузить данные.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(order, status) {
    const numeric = Number(status);
    setBusyId(order.id);

    try {
      await updateOrderStatus(order.id, numeric, token);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, status: numeric, statusName: STATUS_OPTIONS.find((s) => s.value === numeric)?.label }
            : o,
        ),
      );
      showToast("Статус заказа обновлён");
    } catch (err) {
      showToast(err.message || "Не удалось изменить статус", "error");
    } finally {
      setBusyId(null);
    }
  }

  function updateLine(index, patch) {
    setLines((prev) => prev.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  }

  function addLine() {
    setLines((prev) => [...prev, { productId: "", quantity: 1 }]);
  }

  function removeLine(index) {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleCreate(event) {
    event.preventDefault();
    setError("");

    const items = lines
      .filter((line) => line.productId)
      .map((line) => ({ productId: line.productId, quantity: Math.max(1, Number(line.quantity) || 1) }));

    if (!clientId) {
      setError("Выберите клиента.");
      return;
    }
    if (items.length === 0) {
      setError("Добавьте хотя бы один товар.");
      return;
    }
    if (address.trim().length < 5) {
      setError("Введите корректный адрес (минимум 5 символов).");
      return;
    }

    setSaving(true);
    try {
      await createAdminOrder({ userId: clientId, deliveryAddress: address.trim(), items }, token);
      showToast("Заказ создан");
      setShowForm(false);
      setAddress("");
      setLines([{ productId: "", quantity: 1 }]);
      await loadAll();
    } catch (err) {
      setError(err.message || "Не удалось создать заказ.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="admin-orders">
      <SectionHeader title="Управление заказами" subtitle="Все заказы магазина" />

      <div className="admin-orders__toolbar">
        <button
          type="button"
          className="admin-orders__create"
          onClick={() => setShowForm((value) => !value)}
        >
          {showForm ? "Скрыть форму" : "+ Добавить заказ"}
        </button>
      </div>

      {error && <StateMessage tone="error" title="Ошибка" text={error} />}

      {showForm && (
        <form className="admin-orders__form" onSubmit={handleCreate}>
          <h3>Новый заказ</h3>

          <label className="admin-orders__field">
            <span>Клиент</span>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email} ({u.role})
                </option>
              ))}
            </select>
          </label>

          <label className="admin-orders__field">
            <span>Адрес доставки</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Город, улица, дом"
            />
          </label>

          <div className="admin-orders__lines">
            {lines.map((line, index) => (
              <div key={index} className="admin-orders__line">
                <select
                  value={line.productId}
                  onChange={(e) => updateLine(index, { productId: e.target.value })}
                >
                  <option value="">Выберите товар…</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} — {formatPrice(product.price)}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={line.quantity}
                  onChange={(e) => updateLine(index, { quantity: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => removeLine(index)}
                  disabled={lines.length === 1}
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="admin-orders__add-line" onClick={addLine}>
              + Ещё товар
            </button>
          </div>

          <button type="submit" className="admin-orders__save" disabled={saving}>
            {saving ? "Создание…" : "Создать заказ"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="admin-orders__loading">Загрузка заказов…</p>
      ) : orders.length === 0 ? (
        <StateMessage tone="info" title="Заказов нет" text="Создайте первый заказ." />
      ) : (
        <div className="admin-orders__list">
          {orders.map((order) => {
            const status = getOrderStatus(order.status);
            return (
              <article key={order.id} className="admin-order">
                <div className="admin-order__header">
                  <span className="admin-order__number">
                    Заказ № {formatOrderNumber(order.id)}
                  </span>
                  <span className={`admin-order__status admin-order__status--${status.modifier}`}>
                    {status.label}
                  </span>
                </div>

                <p className="admin-order__meta">
                  {order.clientEmail || "Клиент"} ·{" "}
                  {new Date(order.orderDate).toLocaleString("ru-RU")}
                </p>

                <ul className="admin-order__items">
                  {(order.items || []).map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.lineTotal)}</span>
                    </li>
                  ))}
                </ul>

                <div className="admin-order__footer">
                  <span className="admin-order__address" title={order.deliveryAddress}>
                    {order.deliveryAddress}
                  </span>
                  <span className="admin-order__total">{formatPrice(order.totalAmount)}</span>
                </div>

                <div className="admin-order__actions">
                  <label>
                    Статус:
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      disabled={busyId === order.id}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
