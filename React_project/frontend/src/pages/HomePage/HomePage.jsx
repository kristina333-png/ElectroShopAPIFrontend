import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../../mockData.js";
import "./HomePage.css";

export default function HomePage() {
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
            <Link to="/orders" className="home-hero__link">Мои заказы</Link>
          </div>
        </div>
        <aside className="home-hero__panel">
          <p className="home-hero__panel-title">Почему ElectroShop</p>
          <ul className="home-hero__panel-list">
            <li><span aria-hidden="true">⚡</span> Четыре категории и проверенные бренды</li>
            <li><span aria-hidden="true">🔐</span> Личный кабинет и история заказов</li>
            <li><span aria-hidden="true">📦</span> Остатки склада обновляются автоматически</li>
          </ul>
        </aside>
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
        <ProductList products={MOCK_PRODUCTS.slice(0, 3)} />
      </section>
    </div>
  );
}