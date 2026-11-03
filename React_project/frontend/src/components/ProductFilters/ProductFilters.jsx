import "./ProductFilters.css";

/**
 * Панель фильтров каталога.
 * Не хранит состояние само: получает значения и сообщает об изменениях наверх,
 * поэтому фильтры синхронизированы с адресной строкой.
 */
export default function ProductFilters({
  categories = [],
  brands = [],
  value = {},
  onChange,
  onReset,
}) {
  const update = (field) => (event) => onChange?.({ [field]: event.target.value });

  return (
    <aside className="product-filters" aria-label="Фильтры каталога">
      <h2 className="product-filters__title">Фильтры</h2>

      <label className="product-filters__field">
        <span>Категория</span>
        <select value={value.categoryId ?? ""} onChange={update("categoryId")}>
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="product-filters__field">
        <span>Бренд</span>
        <select value={value.brandId ?? ""} onChange={update("brandId")}>
          <option value="">Все бренды</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>

      <div className="product-filters__price">
        <label className="product-filters__field">
          <span>Цена от</span>
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="0"
            value={value.minPrice ?? ""}
            onChange={update("minPrice")}
          />
        </label>

        <label className="product-filters__field">
          <span>Цена до</span>
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="200000"
            value={value.maxPrice ?? ""}
            onChange={update("maxPrice")}
          />
        </label>
      </div>

      <button type="button" className="product-filters__reset" onClick={onReset}>
        Сбросить фильтры
      </button>
    </aside>
  );
}
