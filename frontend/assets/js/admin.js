// assets/js/admin.js
const assetsTbody = document.querySelector("#assetsTable tbody");
const assetModalEl = document.getElementById("assetModal");
const assetModal = new bootstrap.Modal(assetModalEl);
const deleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
let deletingId = null;

document.getElementById("btnAdd").addEventListener("click", () => {
  openAssetModal();
});

document.getElementById("saveAssetBtn").addEventListener("click", saveAsset);
document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
  if (!deletingId) return;
  try {
    await window.api.apiDelete(`/assets/${deletingId}`);
    showToast("Xóa thành công", "success");
    loadAssets();
  } catch (e) {
    showToast("Xóa thất bại: " + e.message, "danger");
  } finally {
    deletingId = null;
    deleteModal.hide();
  }
});

async function loadAssets(){
  assetsTbody.innerHTML = `<tr><td colspan="7" class="text-center py-5">Đang tải...</td></tr>`;
  try {
    const data = await window.api.apiGet("/assets");
    renderTable(data || []);
  } catch (e) {
    assetsTbody.innerHTML = `<tr><td colspan="7" class="text-danger">Lỗi khi tải: ${e.message}</td></tr>`;
  }
}

function renderTable(items){
  if (!items.length) {
    assetsTbody.innerHTML = `<tr><td colspan="7" class="text-center py-5">Không có tài sản</td></tr>`;
    return;
  }
  assetsTbody.innerHTML = "";
  items.forEach(it => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${it.id}</td>
      <td style="width:120px;"><img src="${it.image||'https://via.placeholder.com/120'}" class="img-fluid rounded" /></td>
      <td>${escapeHtml(it.name)}</td>
      <td>${formatMoney(it.price)}</td>
      <td><span class="badge ${badgeClass(it.status)}">${it.status}</span></td>
      <td class="text-truncate" style="max-width:300px">${escapeHtml(it.description||'')}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" data-action="edit" data-id="${it.id}">Sửa</button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${it.id}">Xóa</button>
      </td>
    `;
    assetsTbody.appendChild(tr);
  });

  // attach actions
  assetsTbody.querySelectorAll("button[data-action]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const action = e.currentTarget.dataset.action;
      const id = e.currentTarget.dataset.id;
      if (action === "edit") openAssetModal(id);
      if (action === "delete") { deletingId = id; deleteModal.show(); }
    });
  });
}

function badgeClass(status){
  if (status === "available") return "bg-success";
  if (status === "rented") return "bg-warning text-dark";
  return "bg-secondary";
}

function openAssetModal(id=null){
  document.getElementById("assetForm").reset();
  document.getElementById("assetId").value = "";
  document.getElementById("assetModalTitle").innerText = id ? "Sửa tài sản" : "Thêm tài sản";
  if (!id) {
    assetModal.show();
    return;
  }
  // load asset
  window.api.apiGet(`/assets/${id}`).then(item => {
    if (!item) return showToast("Không tìm thấy tài sản", "danger");
    document.getElementById("assetId").value = item.id;
    document.getElementById("assetName").value = item.name;
    document.getElementById("assetPrice").value = item.price || "";
    document.getElementById("assetImage").value = item.image || "";
    document.getElementById("assetDesc").value = item.description || "";
    document.getElementById("assetStatus").value = item.status || "available";
    assetModal.show();
  }).catch(e => showToast("Lỗi tải: " + e.message, "danger"));
}

async function saveAsset(){
  const id = document.getElementById("assetId").value || null;
  const payload = {
    name: document.getElementById("assetName").value.trim(),
    price: Number(document.getElementById("assetPrice").value) || 0,
    image: document.getElementById("assetImage").value.trim(),
    description: document.getElementById("assetDesc").value.trim(),
    status: document.getElementById("assetStatus").value
  };
  try {
    if (!payload.name) return showToast("Tên không được để trống", "warning");
    if (id) {
      await window.api.apiPut(`/assets/${id}`, payload);
      showToast("Cập nhật thành công", "success");
    } else {
      await window.api.apiPost("/assets", payload);
      showToast("Tạo tài sản thành công", "success");
    }
    assetModal.hide();
    loadAssets();
  } catch (e) {
    showToast("Lưu thất bại: " + e.message, "danger");
  }
}

// helpers
function formatMoney(n){ return typeof n === "number" ? n.toLocaleString("vi-VN") + " ₫" : n; }
function escapeHtml(s){ if (!s) return ""; return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;"); }

function showToast(msg, type="info"){ 
  const toast = document.createElement("div");
  toast.className = `toast-notif badge bg-${type==='success'?'success': type==='danger'?'danger': type==='warning'?'warning':'secondary'} text-white`;
  toast.style.position = "fixed";
  toast.style.right = "20px";
  toast.style.bottom = "20px";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = 99999;
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(()=> toast.classList.add("fadeout"), 2600);
  setTimeout(()=> toast.remove(), 3000);
}

loadAssets();
