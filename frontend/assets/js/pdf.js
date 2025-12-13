function exportPDF(contract) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("HỢP ĐỒNG THUÊ TÀI SẢN - QARENT", 20, 20);
  doc.text(`Khách hàng: ${contract.renter}`, 20, 40);
  doc.text(`Tài sản: ${contract.asset}`, 20, 50);
  doc.text(`Thời gian: ${contract.startDate} - ${contract.endDate}`, 20, 60);
  doc.text(`Trạng thái: ${contract.status}`, 20, 70);

  doc.save("hop-dong-qrent.pdf");
}
