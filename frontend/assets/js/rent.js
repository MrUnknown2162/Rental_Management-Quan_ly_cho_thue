function submitRent(e) {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    qaAlert("Bạn vui lòng đăng nhập trước khi thuê");
    return;
  }

  const form = document.getElementById("rentForm");
  if (!form.checkValidity()) {
    qaAlert("Vui lòng điền đầy đủ tất cả thông tin");
    return;
  }

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  if (end <= start) {
    qaAlert("Ngày kết thúc phải sau ngày bắt đầu");
    return;
  }

  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];

  contracts.unshift({
    id: "HD" + Date.now(),
    asset: document.querySelector("h1").innerText,
    renter: user.name,
    renterEmail: user.email,
    startDate: startDate.value,
    endDate: endDate.value,
    status: "Chờ duyệt",
    createdAt: new Date().toLocaleString()
  });

  localStorage.setItem("contracts", JSON.stringify(contracts));
  qaAlert("Đã gửi yêu cầu thuê. Vui lòng chờ admin duyệt");
  form.reset();
}
