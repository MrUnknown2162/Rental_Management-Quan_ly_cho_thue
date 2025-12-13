// assets/js/main.js
// render asset list
async function renderAssetList(){
  const container = document.getElementById('assetList');
  if (!container) return;
  const data = await window.api.apiGet('/assets');
  container.innerHTML = '';
  (data || []).forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card shadow-sm">
        <img src="${item.image || 'https://via.placeholder.com/800x400'}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text text-muted">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="asset-detail.html?id=${item.id}" class="btn btn-outline-primary">Xem chi tiết</a>
            <span class="text-muted">Giá: <strong>${(item.price||0).toLocaleString('vi-VN')} ₫/ngày</strong></span>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// search functionality
const sInput = document.getElementById('searchInput');
if (sInput) {
  sInput.addEventListener('input', async (e) => {
    const q = e.target.value.toLowerCase();
    const data = await window.api.apiGet('/assets');
    const filtered = (data || []).filter(a => (a.name||'').toLowerCase().includes(q) || (a.description||'').toLowerCase().includes(q));
    const container = document.getElementById('assetList');
    container.innerHTML = '';
    filtered.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card shadow-sm">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-muted">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <a href="asset-detail.html?id=${item.id}" class="btn btn-outline-primary">Xem chi tiết</a>
              <span class="text-muted">Giá: <strong>${(item.price||0).toLocaleString('vi-VN')} ₫/ngày</strong></span>
            </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  });
}

// render asset detail
async function renderAssetDetail(){
  const container = document.getElementById('detailContainer');
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    container.innerHTML = '<p>Không tìm thấy tài sản</p>';
    return;
  }
  const item = await window.api.apiGet('/assets/' + id);
  if (!item) {
    container.innerHTML = '<p>Không tìm thấy tài sản</p>';
    return;
  }
  container.innerHTML = `
    <div class="col-md-6">
      <img src="${item.image}" class="img-fluid rounded shadow-sm" alt="${item.name}">
    </div>
    <div class="col-md-6">
      <h2>${item.name}</h2>
      <p class="text-muted">${item.description}</p>
      <p><strong>Giá:</strong> ${(item.price||0).toLocaleString('vi-VN')} ₫ / ngày</p>
      <p><strong>Tình trạng:</strong> ${item.status}</p>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#rentModal">Thuê ngay</button>
    </div>
  `;

  const confirmBtn = document.getElementById('confirmRent');
  if (confirmBtn) {
    confirmBtn.onclick = async () => {
      const start = document.getElementById('startDate').value;
      const end = document.getElementById('endDate').value;
      if (!start || !end) return alert('Chọn ngày bắt đầu và kết thúc');
      try {
        const res = await window.api.apiPost('/rentals', { asset_id: id, start_date: start, end_date: end });
        if (res && res.success) {
          alert('Thuê thành công! Mã hợp đồng: ' + res.id);
          const rentModal = bootstrap.Modal.getInstance(document.getElementById('rentModal'));
          rentModal.hide();
        } else {
          alert('Thuê thất bại');
        }
      } catch (e) {
        alert('Lỗi: ' + e.message);
      }
    };
  }
}

// init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderAssetList();
  renderAssetDetail();
});
