function logout() {
  localStorage.clear();
  location.href = "login.html";
}
document.querySelectorAll("[data-logout]").forEach(b => b.addEventListener("click", logout));