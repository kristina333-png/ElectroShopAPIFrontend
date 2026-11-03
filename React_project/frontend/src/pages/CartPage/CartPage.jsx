import { Link } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import "./CartPage.css";

export default function CartPage() {
  return (
    <section className="cart-page">
      <SectionHeader title="Корзина" subtitle="Здесь появятся выбранные товары" />
      <StateMessage tone="info" title="Корзина пуста" text="Добавьте товары из каталога.">
        <Link to="/catalog">Перейти в каталог</Link>
      </StateMessage>
    </section>
  );
}