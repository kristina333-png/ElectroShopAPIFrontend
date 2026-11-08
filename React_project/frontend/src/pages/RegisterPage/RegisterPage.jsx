import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";

export default function RegisterPage() {
  return (
    <section>
      <SectionHeader 
        title="Создание аккаунта" 
        subtitle="Зарегистрируйтесь, чтобы оформлять заказы" 
      />
      <RegisterForm />
    </section>
  );
}