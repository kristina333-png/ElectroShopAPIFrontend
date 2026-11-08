import { useState } from "react";
import { registerUser } from "../../api/auth.js";
import "./RegisterForm.css";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(trimmedEmail, password);
      setSuccess("Регистрация выполнена");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form__title">Регистрация</h2>

      <label className="register-form__field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          required
        />
      </label>

      <label className="register-form__field">
        <span>Пароль</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Минимум 6 символов"
          minLength={6}
          required
        />
      </label>

      <label className="register-form__field">
        <span>Подтверждение пароля</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
          required
        />
      </label>

      <button type="submit" className="register-form__button" disabled={isLoading}>
        {isLoading ? "Отправка..." : "Зарегистрироваться"}
      </button>

      {error && <p className="register-form__error">{error}</p>}
      {success && <p className="register-form__success">{success}</p>}
    </form>
  );
}