import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  return (
    <section className="register-page">
      <SectionHeader 
        title="Регистрация" 
        subtitle="Создайте аккаунт, чтобы оформлять заказы" 
      />
      
      <div className="register-page__content">
        <RegisterForm />
        <p className="register-page__link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  );
}