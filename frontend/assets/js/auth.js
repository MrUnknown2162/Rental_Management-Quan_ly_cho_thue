// ===== AUTHENTICATION =====

function registerUser(e) {
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    qaAlert("Email đã tồn tại");
    return;
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
    role: "user"
  });

  localStorage.setItem("users", JSON.stringify(users));
  qaAlert("Đăng ký thành công! Vui lòng đăng nhập");
  window.location.href = "login.html";
}

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const remember = document.getElementById("rememberMe").checked;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    qaAlert("Sai email hoặc mật khẩu");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (remember) {
    localStorage.setItem("rememberUser", JSON.stringify(user));
  }

  window.location.href = user.role === "admin" ? "dashboard.html" : "index.html";
}
