# Rental Manager — Frontend (Demo)

## Cách dùng nhanh
1. Tạo folder `frontend/` và copy các file trong hướng dẫn này theo cấu trúc.
2. Mở terminal ở folder `frontend/`:
3. Mở trình duyệt: http://localhost:8000/index.html

## Ghi chú
- Mặc định project chạy offline bằng mock API (`BASE_URL = "MOCK"` trong `assets/js/api.js`).
- Khi backend FastAPI sẵn sàng, đổi `BASE_URL` trong `assets/js/api.js` thành URL backend (ví dụ: `http://localhost:8000`) và đảm bảo các endpoint:
- GET /assets
- GET /assets/{id}
- POST /assets
- PUT /assets/{id}
- DELETE /assets/{id}
- POST /auth/login
- POST /auth/register
- POST /rentals
