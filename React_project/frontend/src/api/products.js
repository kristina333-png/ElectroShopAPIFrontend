const API_BASE_URL = "http://localhost:5235/api";

async function readError(response, fallback) {
  const data = await response.json().catch(() => null);
  return new Error(data?.error || fallback || `Ошибка сервера: ${response.status}`);
}

/**
 * Товары каталога с фильтрами и поиском.
 * По умолчанию отдаём максимум товаров (pageSize=100), чтобы каталог был полным.
 */
export async function getProducts(filters = {}) {
  const { search, categoryId, brandId, minPrice, maxPrice, page, pageSize } = filters;
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (categoryId) params.set("categoryId", categoryId);
  if (brandId) params.set("brandId", brandId);
  if (minPrice !== undefined && minPrice !== null && minPrice !== "") params.set("minPrice", minPrice);
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") params.set("maxPrice", maxPrice);
  if (page) params.set("page", page);
  params.set("pageSize", pageSize ?? 100);

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
  return await response.json();
}

/** Один товар по id (null, если не найден). */
export async function getProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
  return await response.json();
}

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
  return await response.json();
}

export async function getBrands() {
  const response = await fetch(`${API_BASE_URL}/brands`);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw await readError(response, "Не удалось добавить товар");
  return await response.json();
}

/** Обновление только картинки товара (админ). */
export async function updateProductImage(id, imageUrl, token) {
  const response = await fetch(`${API_BASE_URL}/products/${id}/image`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ imageUrl }),
  });

  if (!response.ok) throw await readError(response, "Не удалось сохранить картинку");
  return await response.json();
}

export async function createOrder(orderData, token) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) throw await readError(response, "Не удалось создать заказ");
  return await response.json();
}

export async function getMyOrders(token) {
  const response = await fetch(`${API_BASE_URL}/orders/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Не удалось загрузить заказы");
  return await response.json();
}
