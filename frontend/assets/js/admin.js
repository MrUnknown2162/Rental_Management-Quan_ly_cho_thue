let editingId = null;

function getUnits() {
  return JSON.parse(localStorage.getItem("units")) || [];
}

function saveUnits(units) {
  localStorage.setItem("units", JSON.stringify(units));
  renderUnits();
}

function renderUnits() {
  const table = document.getElementById("unitTable");
  const units = getUnits();
  table.innerHTML = "";

  units.forEach(u => {
    table.innerHTML += `
      <tr>
        <td><img src="${u.image}" width="80"></td>
        <td>${u.name}</td>
        <td>${u.category}</td>
        <td>${u.price}</td>
        <td>${u.address}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="openEdit(${u.id})">Sửa</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUnit(${u.id})">Xóa</button>
        </td>
      </tr>
    `;
  });
}

function openAdd() {
  editingId = null;
  modalTitle.innerText = "➕ Thêm sản phẩm";
  unitModal.reset?.();
  new bootstrap.Modal(unitModal).show();
}

function openEdit(id) {
  const u = getUnits().find(x => x.id === id);
  editingId = id;

  unitName.value = u.name;
  unitCategory.value = u.category;
  unitPrice.value = u.price;
  unitAddress.value = u.address;

  modalTitle.innerText = "✏️ Sửa sản phẩm";
  new bootstrap.Modal(unitModal).show();
}

function deleteUnit(id) {
  if (!confirm("Xóa sản phẩm này?")) return;
  const units = getUnits().filter(u => u.id !== id);
  saveUnits(units);
}

function saveUnit() {
  const units = getUnits();
  const imgFile = unitImage.files[0];

  const imagePath = imgFile
    ? "assets/images/upload/" + imgFile.name
    : "";

  if (editingId) {
    const u = units.find(x => x.id === editingId);
    u.name = unitName.value;
    u.category = unitCategory.value;
    u.price = unitPrice.value;
    u.address = unitAddress.value;
    if (imagePath) u.image = imagePath;
  } else {
    units.push({
      id: Date.now(),
      name: unitName.value,
      category: unitCategory.value,
      price: unitPrice.value,
      address: unitAddress.value,
      image: imagePath
    });
  }

  saveUnits(units);
  bootstrap.Modal.getInstance(unitModal).hide();
}

document.addEventListener("DOMContentLoaded", renderUnits);