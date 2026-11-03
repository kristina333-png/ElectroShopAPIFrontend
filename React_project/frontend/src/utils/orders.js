/** Статусы заказа из ElectroShopAPI.Models.OrderStatus. */

const STATUS_BY_CODE = {
  0: { label: "Новый", modifier: "new" },
  1: { label: "В обработке", modifier: "processing" },
  2: { label: "Отправлен", modifier: "shipped" },
  3: { label: "Доставлен", modifier: "delivered" },
  4: { label: "Отменён", modifier: "cancelled" },
};

const CODE_BY_NAME = {
  New: 0,
  Processing: 1,
  Shipped: 2,
  Delivered: 3,
  Cancelled: 4,
};

/**
 * Возвращает подпись и модификатор статуса заказа.
 * API по умолчанию отдаёт enum числом, но поддерживаем и строковое значение.
 */
export function getOrderStatus(status) {
  const code = typeof status === "number" ? status : CODE_BY_NAME[status];
  return STATUS_BY_CODE[code] ?? { label: "Неизвестный статус", modifier: "unknown" };
}

/** Короткий номер заказа для карточки. */
export function formatOrderNumber(id) {
  return String(id ?? "").replace(/[^0-9a-zA-Z]/g, "").slice(0, 8).toUpperCase() || "—";
}
