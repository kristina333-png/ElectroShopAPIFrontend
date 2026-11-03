import { Link } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import "./OrdersPage.css";

export default function OrdersPage() {
  return (
    <section className="orders-page">
      <SectionHeader title="Мои заказы" subtitle="История покупок" />
      <StateMessage tone="info" title="Заказов пока нет" text="Оформите первый заказ.">
        <Link to="/catalog">Перейти в каталог</Link>
      </StateMessage>
    </section>
  );
}