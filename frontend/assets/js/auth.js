// assets/js/auth.js
async function login(){
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) return alert('Nhập email và mật khẩu');

  try {
    const res = await window.api.apiPost('/auth/login', { email, password });
    if (res && res.access_token) {
      localStorage.setItem('token', res.access_token);
      alert('Đăng nhập thành công (mock)');
      location.href = 'dashboard.html';
    } else {
      alert(res.detail || 'Đăng nhập thất bại');
    }
  } catch (e) {
    alert('Lỗi: ' + e.message);
  }
}
