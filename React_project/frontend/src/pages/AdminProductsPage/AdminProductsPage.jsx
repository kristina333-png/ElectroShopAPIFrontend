import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton.jsx";
import { getProducts, updateProductImage } from "../../api/products.js";
import { formatPrice } from "../../utils/format.js";
import "./AdminProductsPage.css";

const MAX_IMAGE_MB = 1.5;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

export default function AdminProductsPage() {
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [draft, setDraft] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getProducts({ pageSize: 200 })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError("Не удалось загрузить товары.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? products.filter((p) => p.name.toLowerCase().includes(query)) : products;
  }, [products, search]);

  function imageFor(product) {
    return draft[product.id] !== undefined ? draft[product.id] : product.imageUrl || "";
  }

  function setImage(id, value) {
    setDraft((prev) => ({ ...prev, [id]: value }));
  }

  function handleFile(id, file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Можно загрузить только изображение", "error");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      showToast(`Файл слишком большой (макс. ${MAX_IMAGE_MB} МБ)`, "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(id, String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  async function handleSave(product) {
    setSavingId(product.id);
    setError("");

    try {
      const value = imageFor(product).trim() || null;
      const updated = await updateProductImage(product.id, value, user?.token);

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, imageUrl: updated.imageUrl } : p)),
      );
      setDraft((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
      showToast("Картинка сохранена");
    } catch (err) {
      setError(err.message || "Не удалось сохранить картинку.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="admin-products">
      <SectionHeader title="Товары" subtitle="Картинки и управление каталогом" />

      <div className="admin-products__toolbar">
        <input
          type="search"
          placeholder="Поиск по названию…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/products/new" className="admin-products__create">
          + Добавить товар
        </Link>
      </div>

      {error && <StateMessage tone="error" title="Ошибка" text={error} />}

      {loading ? (
        <div className="admin-products__grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <StateMessage tone="info" title="Товаров нет" text="Добавьте первый товар." />
      ) : (
        <div className="admin-products__grid">
          {visible.map((product) => (
            <article key={product.id} className="admin-product">
              <div className="admin-product__media">
                {imageFor(product) ? (
                  <img src={imageFor(product)} alt={product.name} />
                ) : (
                  <span>Нет картинки</span>
                )}
              </div>

              <div className="admin-product__body">
                <h3 className="admin-product__title" title={product.name}>
                  {product.name}
                </h3>
                <p className="admin-product__meta">
                  {formatPrice(product.price)} · остаток {product.stockQuantity} шт.
                </p>

                <label className="admin-product__file">
                  Загрузить картинку
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(product.id, e.target.files?.[0])}
                  />
                </label>

                <input
                  type="url"
                  className="admin-product__url"
                  placeholder="или ссылка на картинку"
                  value={imageFor(product).startsWith("data:") ? "" : imageFor(product)}
                  onChange={(e) => setImage(product.id, e.target.value)}
                />

                <div className="admin-product__actions">
                  <button
                    type="button"
                    onClick={() => handleSave(product)}
                    disabled={savingId === product.id}
                  >
                    {savingId === product.id ? "Сохранение…" : "Сохранить картинку"}
                  </button>
                  <Link to={`/catalog/${product.id}`} target="_blank" rel="noreferrer">
                    Открыть
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
