import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../api/products.js";
import { useCart } from "../../context/CartContext.jsx";
import { formatPrice } from "../../utils/format.js";
import { buildProductDescription, getCategoryIcon, getProductGradient } from "../../utils/product.js";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        const found = data.find(p => p.id === id);
        setProduct(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!product) return <p>Товар не найден</p>;

  return (
    <section className="product-page">
      <nav className="product-page__breadcrumbs">
        <Link to="/">Главная</Link> / <Link to="/catalog">Каталог</Link> / <span>{product.name}</span>
      </nav>
      <div className="product-page__grid">
        <div className="product-page__media" style={{ backgroundImage: getProductGradient(product.id) }}>
          <span className="product-page__media-icon">{getCategoryIcon(product.category?.name)}</span>
        </div>
        <div className="product-page__info">
          <p className="product-page__category">{product.category?.name}</p>
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__price">{formatPrice(product.price)}</p>
          <p className="product-page__description">{buildProductDescription(product)}</p>
          <div className="product-page__buy">
            <button className="product-page__button" onClick={() => addToCart(product)}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}