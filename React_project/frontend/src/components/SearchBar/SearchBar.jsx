import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({
  initialValue = "",
  placeholder = "Найти товар…",
  buttonLabel = "Найти",
  onSubmit,
}) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value.trim());
  };

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        className="search-bar__input"
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label="Поиск по каталогу"
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="search-bar__button" type="submit">
        {buttonLabel}
      </button>
    </form>
  );
}
