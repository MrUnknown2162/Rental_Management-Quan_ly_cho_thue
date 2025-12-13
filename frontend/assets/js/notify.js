function openNotify() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  let myNotify = notifications.filter(n => n.user === user.name);

  if (myNotify.length === 0) {
    qaAlert("Không có thông báo");
    return;
  }

  let msg = myNotify.map(n => `• ${n.message}\n${n.time}`).join("\n\n");
  qaAlert(msg);
}
