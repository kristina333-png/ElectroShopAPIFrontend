import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <section className="login-page">
      <SectionHeader 
        title="Вход" 
        subtitle="Войдите, чтобы оформлять заказы" 
      />
      <LoginForm />
      <p style={{ marginTop: '16px', fontSize: '14px' }}>
        Нет аккаунта? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Зарегистрируйтесь</Link>
      </p>
    </section>
  );
}