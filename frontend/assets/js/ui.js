function showToast(msg, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast fixed bottom-8 right-8 px-8 py-5 rounded-2xl text-white text-xl font-bold ${type === "success" ? "bg-green-600" : "bg-red-600"}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}