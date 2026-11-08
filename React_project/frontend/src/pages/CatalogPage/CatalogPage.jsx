import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ProductFilters from "../../components/ProductFilters/ProductFilters.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import { getProducts } from "../../api/products.js"; // Импортируем нашу функцию
import "./CatalogPage.css";

export default function CatalogPage() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");     

      try {
        const data = await getProducts(); 
        setProducts(data);               
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить каталог. Проверьте, запущен ли сервер.");
      } finally {
        setLoading(false); 
      }
    }

    loadProducts();
  }, []); 

  return (
    <section className="catalog-page">
      <SectionHeader title="Каталог электроники" subtitle="Ноутбуки, смартфоны, наушники" />
      
      <div className="catalog-page__search">
        <SearchBar onSubmit={() => {}} placeholder="Поиск по названию" />
      </div>

      <div className="catalog-page__layout">
        {}
        <ProductFilters categories={[]} brands={[]} value={{}} onChange={() => {}} onReset={() => {}} />
        
        <div className="catalog-page__results">
          
          {}
          {loading && (
            <p className="catalog-page__count">Загрузка товаров...</p>
          )}

          {error && (
            <p style={{ color: 'red' }}>{error}</p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="catalog-page__count">Товаров пока нет в базе данных.</p>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <p className="catalog-page__count">На странице: {products.length} товар(ов)</p>
              <ProductList products={products} emptyText="Ничего не найдено" />
            </>
          )}

        </div>
      </div>
    </section>
  );
}