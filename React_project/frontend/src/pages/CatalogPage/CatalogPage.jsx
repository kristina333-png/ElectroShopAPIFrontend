import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ProductFilters from "../../components/ProductFilters/ProductFilters.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import { getProducts, getCategories, getBrands } from "../../api/products.js";
import "./CatalogPage.css";

const EMPTY_FILTERS = { search: "", categoryId: "", brandId: "", minPrice: "", maxPrice: "" };

function readFilters(params) {
  return {
    search: params.get("search") || "",
    categoryId: params.get("categoryId") || "",
    brandId: params.get("brandId") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
  };
}

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => readFilters(searchParams));

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Синхронизация с адресной строкой: поиск с главной и ссылки с фильтрами.
  useEffect(() => {
    const next = readFilters(searchParams);
    setFilters((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  }, [searchParams]);

  // Справочники для фильтров.
  useEffect(() => {
    Promise.all([getCategories(), getBrands()])
      .then(([cats, brs]) => {
        setCategories(cats);
        setBrands(brs);
      })
      .catch(() => setError("Не удалось загрузить фильтры каталога."));
  }, []);

  // Загрузка товаров с фильтрами (небольшой debounce для поиска).
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProducts(filters);
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError("Не удалось загрузить каталог. Проверьте, запущен ли сервер.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filters]);

  function applyFilters(patch) {
    const next = { ...filters, ...patch };
    setFilters(next);

    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params, { replace: true });
  }

  function resetFilters() {
    applyFilters(EMPTY_FILTERS);
  }

  return (
    <section className="catalog-page">
      <SectionHeader
        title="Каталог электроники"
        subtitle="Ноутбуки, смартфоны, наушники и аксессуары"
      />

      <div className="catalog-page__search">
        <SearchBar
          key={filters.search}
          initialValue={filters.search}
          onSubmit={(value) => applyFilters({ search: value })}
          placeholder="Поиск по названию"
        />
      </div>

      <div className="catalog-page__layout">
        <ProductFilters
          categories={categories}
          brands={brands}
          value={filters}
          onChange={applyFilters}
          onReset={resetFilters}
        />

        <div className="catalog-page__results">
          {!loading && !error && (
            <p className="catalog-page__count">Найдено товаров: {products.length}</p>
          )}

          {loading && (
            <div className="catalog-page__grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && error && (
            <StateMessage tone="error" title="Ошибка" text={error} />
          )}

          {!loading && !error && products.length === 0 && (
            <StateMessage
              tone="info"
              title="Ничего не найдено"
              text="Попробуйте изменить фильтры или поисковый запрос."
            />
          )}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  );
}
