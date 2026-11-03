import { Link, useParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "../../mockData.js";
import { formatPrice } from "../../utils/format.js";
import { buildProductDescription, getCategoryIcon, getProductGradient } from "../../utils/product.js";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];

  return (
    <section className="product-page">
      <nav className="product-page__breadcrumbs">
        <Link to="/">Главная</Link> <span aria-hidden="true">/</span>
        <Link to="/catalog">Каталог</Link> <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-page__grid">
        <div className="product-page__media" style={{ backgroundImage: getProductGradient(product.id) }}>
          <span className="product-page__media-icon" aria-hidden="true">{getCategoryIcon(product.category?.name)}</span>
          <span className="product-page__brand">{product.brand.name}</span>
        </div>
        <div className="product-page__info">
          <p className="product-page__category">{product.category.name}</p>
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__price">{formatPrice(product.price)}</p>
          <p className="product-page__stock">В наличии: {product.stockQuantity} шт.</p>
          <p className="product-page__description">{buildProductDescription(product)}</p>
          <div className="product-page__buy">
            <button className="product-page__button">В корзину</button>
            <button className="product-page__button product-page__button--ghost">Купить сейчас</button>
          </div>
        </div>
      </div>
    </section>
  );
}