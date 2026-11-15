import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import { getProducts } from "../../api/products.js";
import { MOCK_CATEGORIES } from "../../mockData.js"; // Оставляем категории для красоты
import "./HomePage.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data.slice(0, 3))).catch(console.error);
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Техника, которая работает на вас</p>
          <h1 className="home-hero__title">Электроника для учёбы, работы и отдыха</h1>
          <p className="home-hero__text">Смартфоны, ноутбуки, наушники и умные часы от проверенных брендов.</p>
          <SearchBar onSubmit={() => {}} placeholder="Например: iPhone" />
          <div className="home-hero__actions">
            <Link to="/catalog" className="home-hero__button">Перейти в каталог</Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title="Категории" subtitle="Выберите направление" linkTo="/catalog" linkLabel="Все товары" />
        <div className="home-categories">
          {MOCK_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} caption="Смотреть товары" />
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title="Хиты каталога" subtitle="Первые позиции" linkTo="/catalog" />
        <ProductList products={products} />
      </section>
    </div>
  );
}