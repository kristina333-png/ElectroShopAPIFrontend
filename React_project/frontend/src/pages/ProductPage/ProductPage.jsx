import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../api/products.js";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { formatPrice } from "../../utils/format.js";
import { buildProductDescription, getCategoryIcon, getProductGradient } from "../../utils/product.js";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getProduct(id)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setError("Не удалось загрузить товар. Попробуйте позже.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p className="product-page__state">Загрузка...</p>;
  if (error) return <p className="product-page__state product-page__state--error">{error}</p>;
  if (!product) return <p className="product-page__state">Товар не найден</p>;

  const inStock = (product.stockQuantity ?? 0) > 0;

  function handleAddToCart() {
    addToCart(product);
    showToast(`«${product.name}» добавлен в корзину`);
  }

  return (
    <section className="product-page">
      <nav className="product-page__breadcrumbs">
        <Link to="/">Главная</Link> / <Link to="/catalog">Каталог</Link> / <span>{product.name}</span>
      </nav>

      <div className="product-page__grid">
        <div
          className="product-page__media"
          style={product.imageUrl ? undefined : { backgroundImage: getProductGradient(product.id) }}
        >
          {product.imageUrl ? (
            <img className="product-page__image" src={product.imageUrl} alt={product.name} />
          ) : (
            <span className="product-page__media-icon">{getCategoryIcon(product.category?.name)}</span>
          )}
        </div>

        <div className="product-page__info">
          <p className="product-page__category">{product.category?.name ?? "Электроника"}</p>
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__price">{formatPrice(product.price)}</p>
          <p className={`product-page__stock${inStock ? "" : " product-page__stock--empty"}`}>
            {inStock ? `В наличии: ${product.stockQuantity} шт.` : "Нет в наличии"}
          </p>
          <p className="product-page__description">{buildProductDescription(product)}</p>
          <div className="product-page__buy">
            <button
              className="product-page__button"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {inStock ? "В корзину" : "Нет в наличии"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
