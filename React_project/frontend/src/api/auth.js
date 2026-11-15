const API_BASE_URL = "http://localhost:5235/api";

export async function registerUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || "Не удалось зарегистрироваться. Проверьте данные.";
    throw new Error(errorMessage);
  }
  return true;
}


export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Не удалось выполнить вход");
  }
  
  const data = await response.json();
  return data; 
}


export async function logoutUser() {
  return true; 
}