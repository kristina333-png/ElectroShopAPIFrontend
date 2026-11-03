import { Link } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <section className="login-page">
      <SectionHeader title="Вход и регистрация" subtitle="Аккаунт нужен для заказов" />
      <div className="login-page__layout">
        <form className="login-page__card" onSubmit={(e) => e.preventDefault()}>
          <div className="login-page__tabs">
            <button type="button" className="login-page__tab login-page__tab--active">Вход</button>
            <button type="button" className="login-page__tab">Регистрация</button>
          </div>
          <label className="login-page__field">
            <span>Email</span>
            <input type="email" placeholder="client@test.com" required />
          </label>
          <label className="login-page__field">
            <span>Пароль</span>
            <input type="password" placeholder="Не менее 6 символов" required />
          </label>
          <button type="submit" className="login-page__submit">Войти</button>
        </form>
      </div>
    </section>
  );
}