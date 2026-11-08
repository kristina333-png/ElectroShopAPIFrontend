import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/format.js";
import { buildProductDescription, getCategoryIcon, getProductGradient } from "../../utils/product.js";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  
  // Создаем состояния для одного товара
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
      
        const response = await fetch("http://localhost:5235/api/products");
        if (!response.ok) throw new Error("Ошибка сервера");
        const data = await response.json();
        
        // Находим нужный товар
        const foundProduct = data.find(p => p.id === id);
        if (!foundProduct) throw new Error("Товар не найден");
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) return <p>Загрузка товара...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (!product) return <p>Товар не найден</p>;

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
          {product.brand?.name && <span className="product-page__brand">{product.brand.name}</span>}
        </div>
        <div className="product-page__info">
          <p className="product-page__category">{product.category?.name ?? "Электроника"}</p>
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__price">{formatPrice(product.price)}</p>
          <p className="product-page__stock">В наличии: {product.stockQuantity} шт.</p>
          <p className="product-page__description">{buildProductDescription(product)}</p>
          <div className="product-page__buy">
            <button className="product-page__button">В корзину</button>
          </div>
        </div>
      </div>
    </section>
  );
}