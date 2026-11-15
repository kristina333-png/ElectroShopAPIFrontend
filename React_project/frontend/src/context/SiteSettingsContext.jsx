/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getSiteSettings } from "../api/siteSettings.js";
import { darken, isValidHex, lighten } from "../utils/color.js";

export const DEFAULT_SETTINGS = {
  shopName: "ElectroShop",
  phone: "+7 (999) 123-45-67",
  email: "info@electroshop.ru",
  address: "г. Москва, ул. Тверская, д. 1",
  workHours: "Пн–Вс, 10:00–21:00",
  primaryColor: "#2563eb",
  accentColor: "#f59e0b",
  backgroundColor: "#f3f5fa",
  heroTitle: "Электроника для учёбы, работы и отдыха",
  heroSubtitle: "Смартфоны, ноутбуки, наушники и умные часы от проверенных брендов.",
  footerText: "Учебный проект: клиентская часть на React и серверная часть на ASP.NET Core Web API.",
};

export const SiteSettingsContext = createContext(null);

function applyTheme(settings) {
  const root = document.documentElement;
  const primary = isValidHex(settings.primaryColor)
    ? settings.primaryColor
    : DEFAULT_SETTINGS.primaryColor;
  const accent = isValidHex(settings.accentColor)
    ? settings.accentColor
    : DEFAULT_SETTINGS.accentColor;
  const background = isValidHex(settings.backgroundColor)
    ? settings.backgroundColor
    : DEFAULT_SETTINGS.backgroundColor;

  root.style.setProperty("--color-primary", primary);
  root.style.setProperty("--color-primary-dark", darken(primary, 0.18));
  root.style.setProperty("--color-primary-soft", lighten(primary, 0.88));
  root.style.setProperty("--color-accent", accent);
  root.style.setProperty("--color-bg", background);

  document.title = settings.shopName
    ? `${settings.shopName} — электроника`
    : "ElectroShop";
}

/**
 * Загружает настройки сайта и применяет тему (CSS-переменные) глобально.
 * Настройки меняет администратор в «Конфигураторе».
 */
export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const reload = useCallback(async () => {
    try {
      const data = await getSiteSettings();
      const merged = { ...DEFAULT_SETTINGS, ...(data || {}) };
      setSettings(merged);
      applyTheme(merged);
      return merged;
    } catch {
      applyTheme(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <SiteSettingsContext.Provider value={{ settings, reload }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext) ?? { settings: DEFAULT_SETTINGS, reload: async () => {} };
}
