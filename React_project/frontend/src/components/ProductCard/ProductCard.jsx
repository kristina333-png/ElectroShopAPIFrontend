import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { formatPrice } from "../../utils/format.js";
import { getCategoryIcon, getProductGradient } from "../../utils/product.js";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const inStock = (product.stockQuantity ?? 0) > 0;

  function handleAddToCart() {
    addToCart(product);
    showToast(`«${product.name}» добавлен в корзину`);
  }

  return (
    <article className="product-card">
      <Link to={`/catalog/${product.id}`} className="product-card__link">
        <div
          className="product-card__media"
          style={product.imageUrl ? undefined : { backgroundImage: getProductGradient(product.id) }}
        >
          {product.imageUrl ? (
            <img
              className="product-card__image"
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <span className="product-card__icon" aria-hidden="true">
              {getCategoryIcon(product.category?.name)}
            </span>
          )}
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
          <p className={`product-card__stock${inStock ? "" : " product-card__stock--empty"}`}>
            {inStock ? `В наличии: ${product.stockQuantity} шт.` : "Нет в наличии"}
          </p>
        </div>
      </Link>
      <div className="product-card__footer">
        <button
          type="button"
          className="product-card__button"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {inStock ? "В корзину" : "Нет в наличии"}
        </button>
      </div>
    </article>
  );
}
