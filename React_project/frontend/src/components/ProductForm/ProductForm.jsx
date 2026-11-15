import { useState, useContext } from "react";
import { createProduct } from "../../api/products.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./ProductForm.css";

export default function ProductForm() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!user || user.role !== "Admin") {
      setMessage("Только администратор может добавлять товары");
      return;
    }

    try {
      await createProduct({ name, price: Number(price), stockQuantity: Number(stock), categoryId, brandId }, user.token);
      setMessage("Товар успешно добавлен!");
      setName(""); setPrice(""); setStock(""); setCategoryId(""); setBrandId("");
    } catch {
      setMessage("Ошибка при добавлении товара");
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>Название <input value={name} onChange={e => setName(e.target.value)} required /></label>
      <label>Цена <input type="number" value={price} onChange={e => setPrice(e.target.value)} required /></label>
      <label>Количество <input type="number" value={stock} onChange={e => setStock(e.target.value)} required /></label>
      <label>ID Категории <input value={categoryId} onChange={e => setCategoryId(e.target.value)} required /></label>
      <label>ID Бренда <input value={brandId} onChange={e => setBrandId(e.target.value)} required /></label>
      <button type="submit">Добавить товар</button>
      {message && <p>{message}</p>}
    </form>
  );
}