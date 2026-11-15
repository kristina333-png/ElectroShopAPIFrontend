import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./LoginForm.css"; // <-- ИМЕННО ЭТА СТРОКА ДОЛЖНА БЫТЬ ЗДЕСЬ

export default function LoginForm() {
  const { handleLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError(""); 

    try {
      await handleLogin(email, password);
      setPassword(""); 
      navigate("/catalog"); 
    } catch {
      setError("Неверный email или пароль");
    }
  }

  if (user) return null;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">Вход в аккаунт</h2>
      
      <label className="login-form__field">
        <span>Email</span>
        <input 
          type="email" 
          value={email} 
          required 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </label>
      
      <label className="login-form__field">
        <span>Пароль</span>
        <input 
          type="password" 
          value={password} 
          required 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </label>

      <button type="submit" className="login-form__button">Войти</button>

      {error && <p className="login-form__error">{error}</p>}
    </form>
  );
}