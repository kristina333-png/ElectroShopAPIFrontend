/** Визуальные помощники для карточек товаров (иконки и градиенты). */

const CATEGORY_ICONS = {
  Смартфоны: "📱",
  Ноутбуки: "💻",
  Наушники: "🎧",
  "Умные часы": "⌚",
  Планшеты: "📲",
  Телевизоры: "📺",
  Аксессуары: "🔌",
};

const GRADIENTS = [
  "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
  "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
  "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
  "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
  "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)",
  "linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)",
];

export function getCategoryIcon(categoryName) {
  return CATEGORY_ICONS[categoryName] ?? "⚡";
}

export function getProductGradient(id) {
  let hash = 0;
  for (const char of String(id ?? "")) {
    hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  }
  return GRADIENTS[hash % GRADIENTS.length];
}

/**
 * Подробное описание товара. В API у товара нет поля описания,
 * поэтому оно собирается из названия, бренда и категории.
 */
export function buildProductDescription(product) {
  const brand = product?.brand?.name ?? "Производитель";
  const category = (product?.category?.name ?? "электроника").toLowerCase();
  return `${product?.name ?? "Товар"} — устройство от ${brand} в категории «${category}».
Гарантия производителя, проверка при получении и доставка курьером по всей России.
Остаток на складе обновляется автоматически после оформления каждого заказа.`;
}
