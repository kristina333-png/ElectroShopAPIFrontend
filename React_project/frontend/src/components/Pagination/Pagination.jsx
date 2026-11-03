import "./Pagination.css";

export default function Pagination({ page, hasPrev, hasNext, onPrev, onNext }) {
  return (
    <nav className="pagination" aria-label="Постраничная навигация">
      <button
        type="button"
        className="pagination__button"
        onClick={onPrev}
        disabled={!hasPrev}
      >
        ← Назад
      </button>

      <span className="pagination__current">Страница {page}</span>

      <button
        type="button"
        className="pagination__button"
        onClick={onNext}
        disabled={!hasNext}
      >
        Вперёд →
      </button>
    </nav>
  );
}
