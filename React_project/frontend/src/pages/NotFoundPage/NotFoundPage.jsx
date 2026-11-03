import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Страница не найдена</h1>
      <p className="not-found__text">
        Такой адрес не существует или страница была перемещена. Проверьте
        ссылку либо вернитесь на главную страницу магазина.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__button">
          На главную
        </Link>
        <Link to="/catalog" className="not-found__link">
          Открыть каталог
        </Link>
      </div>
    </section>
  );
}
