import { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../api/auth.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("electroshop_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("electroshop_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("electroshop_user");
    }
  }, [user]);

  async function handleLogin(email, password) {
    const data = await loginUser(email, password);
    setUser({ email, role: data.role, token: data.token });
  }

  async function handleLogout() {
    await logoutUser();
    setUser(null); 
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}