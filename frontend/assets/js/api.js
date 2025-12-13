// assets/js/api.js
// Nếu backend sẵn sàng, đổi BASE_URL thành "http://localhost:8000" hoặc production URL
const BASE_URL = "MOCK"; // "MOCK" để chạy offline bằng dữ liệu mock

// mock data
const mockAssets = [
  { id:1, name:"Xe máy", description:"Xe máy tiện lợi, phù hợp di chuyển trong thành phố", image:"https://images.unsplash.com/photo-1511910849309-5f3eacb0b3f9?auto=format&fit=crop&w=800&q=60", price:500000, status:"available" },
  { id:2, name:"Căn hộ 1PN", description:"Căn hộ tiện nghi, đầy đủ tiện ích", image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60", price:1200000, status:"available" },
  { id:3, name:"Máy tính", description:"Máy tính cấu hình mạnh", image:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60", price:300000, status:"rented" }
];
let _mockNextId = 4;

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

function defaultHeaders() {
  const headers = {};
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = "Bearer " + token;
  return headers;
}

async function apiGet(path) {
  if (BASE_URL === "MOCK") {
    if (path === "/assets") return Promise.resolve(mockAssets.slice());
    if (path.startsWith("/assets/")) {
      const id = parseInt(path.split("/")[2]);
      return Promise.resolve(mockAssets.find(a=>a.id===id));
    }
    return Promise.resolve({});
  }
  const url = BASE_URL + path;
  return fetchJSON(url, { method: "GET", headers: defaultHeaders() });
}

async function apiPost(path, data) {
  if (BASE_URL === "MOCK") {
    if (path === "/auth/login") {
      if (data.email && data.password) return Promise.resolve({ access_token:"mock-token" });
      else return Promise.resolve({ detail:"invalid" });
    }
    if (path === "/auth/register") {
      return Promise.resolve({ success:true });
    }
    if (path === "/assets") {
      const newItem = { id:_mockNextId++, ...data };
      mockAssets.push(newItem);
      return Promise.resolve(newItem);
    }
    if (path === "/rentals") {
      return Promise.resolve({ success:true, id: Math.floor(Math.random()*9000+1000) });
    }
    return Promise.resolve({});
  }
  const url = BASE_URL + path;
  return fetchJSON(url, {
    method: "POST",
    headers: { ...defaultHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

async function apiPut(path, data) {
  if (BASE_URL === "MOCK") {
    if (path.startsWith("/assets/")) {
      const id = parseInt(path.split("/")[2]);
      const idx = mockAssets.findIndex(a=>a.id===id);
      if (idx===-1) return Promise.reject("Not found");
      mockAssets[idx] = { ...mockAssets[idx], ...data };
      return Promise.resolve(mockAssets[idx]);
    }
    return Promise.resolve({});
  }
  const url = BASE_URL + path;
  return fetchJSON(url, {
    method: "PUT",
    headers: { ...defaultHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

async function apiDelete(path) {
  if (BASE_URL === "MOCK") {
    if (path.startsWith("/assets/")) {
      const id = parseInt(path.split("/")[2]);
      const idx = mockAssets.findIndex(a=>a.id===id);
      if (idx===-1) return Promise.reject("Not found");
      mockAssets.splice(idx,1);
      return Promise.resolve({ success:true });
    }
    return Promise.resolve({});
  }
  const url = BASE_URL + path;
  return fetchJSON(url, { method: "DELETE", headers: defaultHeaders() });
}

// export
window.api = { apiGet, apiPost, apiPut, apiDelete, BASE_URL };
