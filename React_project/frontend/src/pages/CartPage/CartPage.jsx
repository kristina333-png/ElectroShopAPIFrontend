import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { createOrder } from "../../api/products.js";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import { formatPrice } from "../../utils/format.js";
import "./CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!user) {
      alert("Войдите в аккаунт, чтобы оформить заказ");
      navigate("/login");
      return;
    }

    if (address.trim().length < 5) {
      setError("Введите корректный адрес доставки (минимум 5 символов)");
      return;
    }

    setLoading(true);
    setError("");

    try {
    
      const orderData = {
        deliveryAddress: address,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      await createOrder(orderData, user.token);
      
      alert("Заказ успешно оформлен!");
      clearCart();
      navigate("/orders"); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <section>
        <SectionHeader title="Корзина" subtitle="Здесь появятся выбранные товары" />
        <p>Ваша корзина пуста. <Link to="/catalog">Перейти в каталог</Link></p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <SectionHeader title="Корзина" subtitle={`Товаров: ${cartItems.length}`} />
      <div className="cart-page__layout">
        <ul className="cart-page__list">
          {cartItems.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
              <span>{item.name}</span>
              <span>{item.quantity} шт.</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
              <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Удалить</button>
            </li>
          ))}
        </ul>
        <aside className="cart-page__summary">
          <h2>Итого: {formatPrice(totalPrice)}</h2>
          
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Адрес доставки:</label>
            <textarea 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Город, улица, дом, квартира"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
            />
          </div>

          {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

          <button 
            className="cart-page__submit" 
            onClick={handleCheckout}
            disabled={loading}
            style={{ marginTop: '15px', width: '100%' }}
          >
            {loading ? "Оформление..." : "Оформить заказ"}
          </button>
        </aside>
      </div>
    </section>
  );
}