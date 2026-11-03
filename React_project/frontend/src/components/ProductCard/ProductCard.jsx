import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format.js";
import { getCategoryIcon, getProductGradient } from "../../utils/product.js";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/catalog/${product.id}`} className="product-card__link">
        <div
          className="product-card__media"
          style={{ backgroundImage: getProductGradient(product.id) }}
        >
          <span className="product-card__icon" aria-hidden="true">
            {getCategoryIcon(product.category?.name)}
          </span>
          {product.brand?.name && (
            <span className="product-card__brand">{product.brand.name}</span>
          )}
        </div>
        <div className="product-card__body">
          <p className="product-card__category">
            {product.category?.name ?? "Электроника"}
          </p>
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <div className="product-card__footer">
        {}
        <button type="button" className="product-card__button">
          В корзину
        </button>
      </div>
    </article>
  );
}