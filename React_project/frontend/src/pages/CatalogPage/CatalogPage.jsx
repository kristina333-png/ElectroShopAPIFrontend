import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ProductFilters from "../../components/ProductFilters/ProductFilters.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../../mockData.js";
import "./CatalogPage.css";

export default function CatalogPage() {
  return (
    <section className="catalog-page">
      <SectionHeader title="Каталог электроники" subtitle="Ноутбуки, смартфоны, наушники" />
      <div className="catalog-page__search">
        <SearchBar onSubmit={() => {}} placeholder="Поиск по названию" />
      </div>
      <div className="catalog-page__layout">
        <ProductFilters categories={MOCK_CATEGORIES} brands={[]} value={{}} onChange={() => {}} onReset={() => {}} />
        <div className="catalog-page__results">
          <p className="catalog-page__count">На странице: {MOCK_PRODUCTS.length} товар(ов)</p>
          <ProductList products={MOCK_PRODUCTS} emptyText="Ничего не найдено" />
        </div>
      </div>
    </section>
  );
}