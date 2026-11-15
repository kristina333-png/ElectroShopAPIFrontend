import "./CardSkeleton.css";

/** Скелетон-заглушка карточки для состояния загрузки. */
export default function CardSkeleton() {
  return (
    <div className="card-skeleton" aria-hidden="true">
      <div className="card-skeleton__media" />
      <div className="card-skeleton__body">
        <div className="card-skeleton__line card-skeleton__line--short" />
        <div className="card-skeleton__line" />
        <div className="card-skeleton__line card-skeleton__line--price" />
      </div>
    </div>
  );
}
