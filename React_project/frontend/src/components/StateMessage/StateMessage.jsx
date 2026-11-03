import "./StateMessage.css";

/**
 * Универсальное сообщение о состоянии: загрузка, ошибка, подсказка, успех.
 * Принимает children, чтобы внутрь можно было положить ссылку или кнопку.
 */
export default function StateMessage({ tone = "info", title, text, children }) {
  return (
    <div
      className={`state-message state-message--${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {title && <p className="state-message__title">{title}</p>}
      {text && <p className="state-message__text">{text}</p>}
      {children && <div className="state-message__actions">{children}</div>}
    </div>
  );
}
