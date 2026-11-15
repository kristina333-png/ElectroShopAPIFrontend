const API_BASE_URL = "http://localhost:5235/api";

/** Публичные настройки сайта (название, контакты, цвета, тексты). */
export async function getSiteSettings() {
  const response = await fetch(`${API_BASE_URL}/site-settings`);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
  return await response.json();
}

/** Сохранение настроек сайта (только Admin). */
export async function updateSiteSettings(data, token) {
  const response = await fetch(`${API_BASE_URL}/site-settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const firstDetail = payload?.details
      ? Object.values(payload.details).flat().filter(Boolean)[0]
      : null;
    throw new Error(firstDetail || payload?.error || "Не удалось сохранить настройки");
  }

  return await response.json();
}
