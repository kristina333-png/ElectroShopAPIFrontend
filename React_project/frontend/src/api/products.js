const API_BASE_URL = "http://localhost:5235/api";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  return await response.json(); 
}

export async function loginAdmin(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Ошибка авторизации");
  return await response.json(); 
}

export async function createProduct(product, token) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Не удалось добавить товар");
  }
}


export async function createOrder(orderData, token) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Не удалось создать заказ");
  }
  return await response.json();
}

export async function getMyOrders(token) {
  const response = await fetch(`${API_BASE_URL}/orders/my`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить заказы");
  }
  return await response.json();
}