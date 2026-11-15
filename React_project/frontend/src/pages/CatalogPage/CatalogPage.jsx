import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ProductFilters from "../../components/ProductFilters/ProductFilters.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import { getProducts } from "../../api/products.js";
import "./CatalogPage.css";

export default function CatalogPage() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    brandId: "",
    minPrice: "",
    maxPrice: ""
  });

  const categories = []; 
  const brands = [];

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");     

      try {
        const data = await getProducts(filters); 
        setProducts(data);               
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить каталог. Проверьте, запущен ли сервер.");
      } finally {
        setLoading(false); 
      }
    }

    loadProducts();
  }, [filters]);

  const handleFiltersChange = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      categoryId: "",
      brandId: "",
      minPrice: "",
      maxPrice: ""
    });
  };

  return (
    <section className="catalog-page">
      <SectionHeader title="Каталог электроники" subtitle="Ноутбуки, смартфоны, наушники" />
      
      <div className="catalog-page__search">
        <SearchBar 
          key={filters.search}
          initialValue={filters.search}
          onSubmit={(value) => handleFiltersChange({ search: value })} 
          placeholder="Поиск по названию" 
        />
      </div>

      <div className="catalog-page__layout">
        <ProductFilters 
          categories={categories} 
          brands={brands} 
          value={filters} 
          onChange={handleFiltersChange} 
          onReset={handleReset} 
        />
        
        <div className="catalog-page__results">
          {loading && <p>Загрузка товаров...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && products.length === 0 && <p>Товаров нет.</p>}
          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  );
}