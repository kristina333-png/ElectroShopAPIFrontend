/** Небольшие помощники для работы с HEX-цветами темы. */

export function isValidHex(value) {
  return typeof value === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
}

function normalizeHex(hex) {
  let value = String(hex).replace("#", "").trim();
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  return value;
}

function hexToRgb(hex) {
  const value = normalizeHex(hex);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (number) =>
    Math.max(0, Math.min(255, Math.round(number))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Смешивает цвет с целевым: weight=0 — исходный, weight=1 — целевой. */
export function mix(hex, targetHex, weight) {
  const source = hexToRgb(hex);
  const target = hexToRgb(targetHex);
  const w = Math.max(0, Math.min(1, weight));
  return rgbToHex({
    r: source.r * (1 - w) + target.r * w,
    g: source.g * (1 - w) + target.g * w,
    b: source.b * (1 - w) + target.b * w,
  });
}

export function darken(hex, amount) {
  return mix(hex, "#000000", amount);
}

export function lighten(hex, amount) {
  return mix(hex, "#ffffff", amount);
}
