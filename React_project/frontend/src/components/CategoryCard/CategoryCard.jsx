import { Link } from "react-router-dom";
import { getCategoryIcon } from "../../utils/product.js";
import "./CategoryCard.css";

export default function CategoryCard({ category, caption }) {
  return (
    <Link
      to={`/catalog?categoryId=${encodeURIComponent(category.id)}`}
      className="category-card"
    >
      <span className="category-card__icon" aria-hidden="true">
        {getCategoryIcon(category.name)}
      </span>
      <span className="category-card__name">{category.name}</span>
      {caption && <span className="category-card__caption">{caption}</span>}
    </Link>
  );
}
