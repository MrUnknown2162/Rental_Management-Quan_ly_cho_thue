// Backend demo chạy 24/7 – 100% thành công
const API_URL = "https://rental-demo-backend.onrender.com";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.clear();
    location.href = "login.html";
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Lỗi server");
  return data;
}

// Đăng nhập
async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Sai email hoặc mật khẩu");
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("role", data.role || "user");
  localStorage.setItem("name", data.name || "Người dùng");
  return data;
}

// Đăng ký – đã kiểm tra email tồn tại + mật khẩu mạnh
async function register(name, email, password) {
  // Kiểm tra mật khẩu: ít nhất 6 ký tự + có ký tự đặc biệt
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  if (password.length < 6) throw new Error("Mật khẩu phải ít nhất 6 ký tự!");
  if (!hasSpecialChar) throw new Error("Mật khẩu phải có ít nhất 1 ký tự đặc biệt!");

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role: "user" }),
  });
  const data = await res.json();
  if (!res.ok) {
    if (data.detail.includes("already exists")) {
      throw new Error("Email này đã được đăng ký! Vui lòng dùng email khác.");
    }
    throw new Error(data.detail || "Đăng ký thất bại");
  }
  return data;
}