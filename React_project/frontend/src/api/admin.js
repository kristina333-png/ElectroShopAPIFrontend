const API_BASE_URL = "http://localhost:5235/api";

/** Обёртка для админских запросов (заказы, пользователи). */
async function request(path, { method = "GET", token, body } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.error || `Ошибка сервера: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

/** Все заказы (Admin). */
export function getAllOrders(token) {
  return request("/orders", { token });
}

/** Смена статуса заказа (Admin). */
export function updateOrderStatus(id, status, token) {
  return request(`/orders/${id}/status`, { method: "PATCH", token, body: { status } });
}

/** Создание заказа админом для выбранного клиента. */
export function createAdminOrder(data, token) {
  return request("/orders/admin", { method: "POST", token, body: data });
}

/** Список пользователей (Admin) — для выбора клиента. */
export function getUsers(token) {
  return request("/users", { token });
}
