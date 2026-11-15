import { useContext } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import { AuthContext } from "../../context/AuthContext.jsx";

export default function UserInfo() {
  const { user, handleLogout } = useContext(AuthContext);

  async function handleLogoutClick() {
    try {
      await handleLogout();
    } catch {

    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      
      {!user && (
        <>
          <span style={{ fontSize: "14px", color: "#cbd5e1" }}>
            Вы не вошли в систему
          </span>
          <Link 
            to="/login" 
            style={{
              padding: "6px 14px",
              backgroundColor: "var(--color-primary, #2563eb)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "14px"
            }}
          >
            Войти
          </Link>
        </>
      )}

      {user && (
        <>
          <span style={{ fontSize: "14px", color: "#f8fafc" }}>
            Привет, {user.email}!
          </span>
          <button 
            type="button" 
            onClick={handleLogoutClick}
            style={{
              padding: "6px 12px",
              backgroundColor: "#e2e8f0",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px"
            }}
          >
            Выход
          </button>
        </>
      )}

    </div>
  );
}