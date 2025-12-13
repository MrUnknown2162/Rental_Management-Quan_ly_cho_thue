function approveContract(index, status) {
  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  contracts[index].status = status;

  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  notifications.push({
    user: contracts[index].renter,
    message: `Hợp đồng ${contracts[index].asset} đã ${status}`,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("contracts", JSON.stringify(contracts));
  localStorage.setItem("notifications", JSON.stringify(notifications));

  qaAlert("Đã xử lý hợp đồng");
}
