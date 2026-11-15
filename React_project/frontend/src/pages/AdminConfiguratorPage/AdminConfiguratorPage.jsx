import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useSiteSettings } from "../../context/SiteSettingsContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import StateMessage from "../../components/StateMessage/StateMessage.jsx";
import { getSiteSettings, updateSiteSettings } from "../../api/siteSettings.js";
import { isValidHex } from "../../utils/color.js";
import "./AdminConfiguratorPage.css";

function ColorField({ label, value, onChange }) {
  return (
    <label className="configurator__color">
      <span>{label}</span>
      <div className="configurator__color-row">
        <input
          type="color"
          value={isValidHex(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          value={value}
          maxLength={7}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#2563eb"
        />
      </div>
    </label>
  );
}

function Swatch({ label, color }) {
  return (
    <span className="configurator__swatch">
      <span className="configurator__swatch-dot" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export default function AdminConfiguratorPage() {
  const { user } = useContext(AuthContext);
  const { reload } = useSiteSettings();
  const { showToast } = useToast();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getSiteSettings()
      .then((data) => {
        if (!cancelled) setForm(data);
      })
      .catch(() => {
        if (!cancelled) setError("Не удалось загрузить настройки сайта.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.shopName || form.shopName.trim().length < 2) {
      setError("Название магазина должно быть не короче 2 символов.");
      return;
    }

    const colorFields = [
      ["primaryColor", "Основной"],
      ["accentColor", "Акцентный"],
      ["backgroundColor", "Фон"],
    ];
    for (const [field, label] of colorFields) {
      if (!isValidHex(form[field])) {
        setError(`Цвет «${label}» должен быть в формате #RRGGBB.`);
        return;
      }
    }

    setSaving(true);
    try {
      await updateSiteSettings(
        {
          shopName: form.shopName.trim(),
          phone: form.phone || null,
          email: form.email || null,
          address: form.address || null,
          workHours: form.workHours || null,
          primaryColor: form.primaryColor,
          accentColor: form.accentColor,
          backgroundColor: form.backgroundColor,
          heroTitle: form.heroTitle || null,
          heroSubtitle: form.heroSubtitle || null,
          footerText: form.footerText || null,
        },
        user?.token,
      );

      await reload();
      showToast("Настройки сайта сохранены");
    } catch (err) {
      setError(err.message || "Не удалось сохранить настройки.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section>
        <SectionHeader title="Конфигуратор сайта" subtitle="Загрузка настроек…" />
        <StateMessage tone="loading" title="Загрузка…" />
      </section>
    );
  }

  if (!form) {
    return (
      <section>
        <SectionHeader title="Конфигуратор сайта" subtitle="Настройки магазина" />
        <StateMessage tone="error" title="Ошибка" text={error || "Настройки недоступны."} />
      </section>
    );
  }

  return (
    <section className="configurator">
      <SectionHeader
        title="Конфигуратор сайта"
        subtitle="Название, контакты, цвета и тексты магазина (только для администратора)"
      />

      {error && <StateMessage tone="error" title="Ошибка" text={error} />}

      <form className="configurator__layout" onSubmit={handleSubmit}>
        <div className="configurator__form">
          <div className="configurator__card">
            <h3>Магазин</h3>

            <label className="configurator__field">
              <span>Название магазина *</span>
              <input
                value={form.shopName}
                onChange={(e) => update("shopName", e.target.value)}
                maxLength={100}
                required
              />
            </label>

            <div className="configurator__row">
              <label className="configurator__field">
                <span>Телефон</span>
                <input
                  value={form.phone ?? ""}
                  onChange={(e) => update("phone", e.target.value)}
                  maxLength={30}
                  placeholder="+7 (999) 123-45-67"
                />
              </label>
              <label className="configurator__field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={100}
                  placeholder="info@shop.ru"
                />
              </label>
            </div>

            <label className="configurator__field">
              <span>Адрес</span>
              <input
                value={form.address ?? ""}
                onChange={(e) => update("address", e.target.value)}
                maxLength={200}
                placeholder="Город, улица, дом"
              />
            </label>

            <label className="configurator__field">
              <span>Часы работы</span>
              <input
                value={form.workHours ?? ""}
                onChange={(e) => update("workHours", e.target.value)}
                maxLength={100}
                placeholder="Пн–Вс, 10:00–21:00"
              />
            </label>
          </div>

          <div className="configurator__card">
            <h3>Цветовая гамма</h3>
            <div className="configurator__colors">
              <ColorField
                label="Основной цвет"
                value={form.primaryColor}
                onChange={(value) => update("primaryColor", value)}
              />
              <ColorField
                label="Акцентный цвет"
                value={form.accentColor}
                onChange={(value) => update("accentColor", value)}
              />
              <ColorField
                label="Цвет фона"
                value={form.backgroundColor}
                onChange={(value) => update("backgroundColor", value)}
              />
            </div>
          </div>

          <div className="configurator__card">
            <h3>Тексты</h3>

            <label className="configurator__field">
              <span>Заголовок главной страницы</span>
              <input
                value={form.heroTitle ?? ""}
                onChange={(e) => update("heroTitle", e.target.value)}
                maxLength={200}
              />
            </label>

            <label className="configurator__field">
              <span>Подзаголовок главной страницы</span>
              <textarea
                value={form.heroSubtitle ?? ""}
                onChange={(e) => update("heroSubtitle", e.target.value)}
                maxLength={300}
                rows={2}
              />
            </label>

            <label className="configurator__field">
              <span>Текст в подвале</span>
              <textarea
                value={form.footerText ?? ""}
                onChange={(e) => update("footerText", e.target.value)}
                maxLength={300}
                rows={2}
              />
            </label>
          </div>

          <div className="configurator__actions">
            <button type="submit" className="configurator__save" disabled={saving}>
              {saving ? "Сохранение…" : "Сохранить настройки"}
            </button>
          </div>
        </div>

        <aside className="configurator__preview">
          <h3>Предпросмотр</h3>

          <div className="configurator__preview-page" style={{ backgroundColor: form.backgroundColor }}>
            <div className="configurator__preview-header" style={{ backgroundColor: form.primaryColor }}>
              <strong>{form.shopName || "Название магазина"}</strong>
              <span>{form.phone}</span>
            </div>

            <div className="configurator__preview-body">
              <p className="configurator__preview-title">
                {form.heroTitle || "Заголовок главной страницы"}
              </p>
              <p className="configurator__preview-text">{form.heroSubtitle}</p>
              <span className="configurator__preview-button" style={{ backgroundColor: form.primaryColor }}>
                В корзину
              </span>
              <span className="configurator__preview-badge" style={{ backgroundColor: form.accentColor }}>
                Акция
              </span>
            </div>

            <div className="configurator__preview-footer">{form.footerText}</div>
          </div>

          <div className="configurator__swatches">
            <Swatch label="Основной" color={form.primaryColor} />
            <Swatch label="Акцент" color={form.accentColor} />
            <Swatch label="Фон" color={form.backgroundColor} />
          </div>
        </aside>
      </form>
    </section>
  );
}
