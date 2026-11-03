import ProductCard from "../ProductCard/ProductCard.jsx";
import "./ProductList.css";

export default function ProductList({
  products = [],
  emptyText = "Товары не найдены.",
}) {
  if (products.length === 0) {
    return <p className="product-list__empty">{emptyText}</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
