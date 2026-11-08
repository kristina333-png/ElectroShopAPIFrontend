import { useState } from "react";
import { createProduct, loginAdmin } from "../../api/products.js"; 
import "./ProductForm.css";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const newProduct = {
      name: name.trim(),
      price: Number(price),
      stockQuantity: Number(stock),
      categoryId: categoryId,
      brandId: brandId
    };

    if (!newProduct.name || !categoryId || !brandId) {
      setMessage("Заполните все обязательные поля");
      setIsError(true);
      return;
    }

    try {
      const authData = await loginAdmin("admin@electroshop.local", "Admin123!");
      
      await createProduct(newProduct, authData.token);
      
      setMessage("Товар успешно добавлен!");
      setName("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setBrandId("");
    } catch (err) {
      console.error(err);
      setMessage("Не удалось добавить товар. Проверьте данные или права доступа.");
      setIsError(true);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label className="product-form__field">
        <span>Название товара *</span>
        <input 
          type="text" 
          required
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Например: iPhone 15"
        />
      </label>

      <label className="product-form__field">
        <span>Цена (руб.) *</span>
        <input 
          type="number" 
          min="1"
          step="0.01"
          required
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
      </label>

      <label className="product-form__field">
        <span>Количество на складе *</span>
        <input 
          type="number" 
          min="0"
          step="1"
          required
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
        />
      </label>

      <label className="product-form__field">
        <span>ID Категории *</span>
        <input 
          type="text" 
          required
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)} 
          placeholder="Вставьте GUID категории"
        />
      </label>

      <label className="product-form__field">
        <span>ID Бренда *</span>
        <input 
          type="text" 
          required
          value={brandId} 
          onChange={(e) => setBrandId(e.target.value)} 
          placeholder="Вставьте GUID бренда"
        />
      </label>

      <button type="submit" className="product-form__button">
        Добавить товар
      </button>

      {message && (
        <p className={isError ? "product-form__error" : "product-form__success"}>
          {message}
        </p>
      )}
    </form>
  );
}