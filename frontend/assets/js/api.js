const API_URL = "http://127.0.0.1:8000";

// ===== LẤY TOKEN =====
function getToken() {
  return localStorage.getItem("access_token");
}

// ===== REGISTER =====
async function apiRegister(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ===== LOGIN =====
async function apiLogin(email, password) {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form
  });

  return res.json();
}

// ===== GET CURRENT USER =====
async function apiMe() {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });
  return res.json();
}

// ===== CREATE BOOKING =====
async function apiCreateBooking(data) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
