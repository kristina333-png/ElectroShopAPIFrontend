import { useEffect, useState, useContext } from "react";
import { createProduct, getCategories, getBrands } from "../../api/products.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import "./ProductForm.css";

const MAX_IMAGE_MB = 1.5;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

export default function ProductForm() {
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getCategories(), getBrands()])
      .then(([cats, brs]) => {
        setCategories(cats);
        setBrands(brs);
        if (cats[0]) setCategoryId(cats[0].id);
        if (brs[0]) setBrandId(brs[0].id);
      })
      .catch(() => setMessage("Не удалось загрузить категории и бренды."));
  }, []);

  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Можно загрузить только изображение.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setMessage(`Файл слишком большой. Максимум ${MAX_IMAGE_MB} МБ.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(String(reader.result || ""));
      setMessage("");
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!user || user.role !== "Admin") {
      setMessage("Только администратор может добавлять товары.");
      return;
    }

    setSaving(true);
    try {
      await createProduct(
        {
          name,
          price: Number(price),
          stockQuantity: Number(stock),
          categoryId,
          brandId,
          imageUrl: imageUrl.trim() || null,
        },
        user.token,
      );

      showToast("Товар успешно добавлен");
      setName("");
      setPrice("");
      setStock("");
      setImageUrl("");
    } catch (err) {
      setMessage(err.message || "Ошибка при добавлении товара.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label className="product-form__field">
        <span>Название</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={200}
          placeholder="Например: Ноутбук Apple MacBook Air"
        />
      </label>

      <div className="product-form__row">
        <label className="product-form__field">
          <span>Цена, ₽</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className="product-form__field">
          <span>Количество</span>
          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="product-form__row">
        <label className="product-form__field">
          <span>Категория</span>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="product-form__field">
          <span>Бренд</span>
          <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="product-form__image">
        <span className="product-form__label">Картинка товара</span>
        <div className="product-form__image-row">
          <div className="product-form__preview">
            {imageUrl ? (
              <img src={imageUrl} alt="Предпросмотр" />
            ) : (
              <span>Нет картинки</span>
            )}
          </div>
          <div className="product-form__image-controls">
            <label className="product-form__file">
              Загрузить файл
              <input type="file" accept="image/*" onChange={handleFile} />
            </label>
            <input
              type="url"
              placeholder="или вставьте ссылку на картинку"
              value={imageUrl.startsWith("data:") ? "" : imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl && (
              <button
                type="button"
                className="product-form__clear"
                onClick={() => setImageUrl("")}
              >
                Убрать картинку
              </button>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="product-form__button" disabled={saving}>
        {saving ? "Сохранение..." : "Добавить товар"}
      </button>

      {message && <p className="product-form__error">{message}</p>}
    </form>
  );
}
