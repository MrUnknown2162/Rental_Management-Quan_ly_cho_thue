// DÙNG TẠM ĐỂ TEST ĐĂNG KÝ/ĐĂNG NHẬP NGAY LẬP TỨC
const API_URL = "https://rental-demo-backend.onrender.com";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (res.status === 401) { localStorage.clear(); location.href = "login.html"; }
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Lỗi server");
  return data;
}

async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Sai thông tin");
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("role", data.role || "user");
  return data;
}

async function register(name, email, password) {
  return await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

async function getAssets() { return await apiFetch("/assets/"); }
async function createAsset(asset) { return await apiFetch("/assets/", { method: "POST", body: JSON.stringify(asset) }); }