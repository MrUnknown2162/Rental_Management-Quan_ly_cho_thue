# Rental Management System (QARent)

Hệ thống **Quản lý cho thuê tài sản** (nhà trọ, căn hộ, phòng thuê)  
được xây dựng bằng **FastAPI** theo mô hình **RESTful API**.

Dự án phục vụ mục đích học tập, thực hành xây dựng backend API có xác thực,
phân quyền và quản lý dữ liệu cho bài tập / đồ án môn học.

---

## 🚀 Chức năng chính

- Đăng ký, đăng nhập người dùng (JWT Authentication)
- Xác thực người dùng bằng OAuth2 Password Flow
- Quản lý tài sản cho thuê (Property)
- Quản lý phòng cho thuê (Multi-unit)
- Đặt thuê phòng (Booking)
- Phân quyền người dùng (User / Admin)
- Kết nối frontend demo để minh họa hoạt động hệ thống

---

## 🛠️ Công nghệ sử dụng

### Backend
- **FastAPI**
- **SQLAlchemy**
- **Alembic (Migration)**
- **PostgreSQL**
- **OAuth2 Password Flow + JWT**
- **Pydantic v2**

### Frontend (Demo)
- HTML5
- CSS3 + Bootstrap 5
- JavaScript (Fetch API)
- LocalStorage (demo)

⚠️ *Frontend chỉ dùng để demo giao diện và test API, không phải production.*

---

## 🔐 Danh sách API chính

### Authentication
- `POST /auth/register` – Đăng ký tài khoản
- `POST /auth/login` – Đăng nhập, nhận JWT
- `GET  /auth/me` – Lấy thông tin user hiện tại (JWT required)

### Properties (Tài sản)
- `POST /properties` – Tạo tài sản cho thuê
- `GET  /properties` – Danh sách tài sản của user

### Units (Phòng)
- `POST /units` – Tạo phòng cho tài sản
- `GET  /units/by-property/{property_id}` – Danh sách phòng theo tài sản

### Bookings (Đặt thuê)
- `POST /bookings` – Đặt thuê phòng
- `GET  /bookings/by-unit/{unit_id}` – Danh sách booking của phòng

---

## ▶️ Hướng dẫn chạy Backend

### 1️⃣ Tạo virtual environment

```bash

cd backend

python -m venv venv

Kích hoạt môi trường ảo:

Windows

venv\Scripts\activate


Linux / macOS

source venv/bin/activate

2️⃣ Cài đặt thư viện

pip install -r requirements.txt

3️⃣ Cấu hình database

Tạo file .env trong thư mục backend/:

DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/rental_db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

4️⃣ Chạy migration

alembic upgrade head

5️⃣ Chạy server

uvicorn app.main:app --reload


API Docs (Swagger):

👉 http://127.0.0.1:8000/docs

🌐 Chạy Frontend (Demo)

Frontend là HTML tĩnh, có thể mở bằng:

Live Server (VS Code)

Hoặc mở trực tiếp file frontend/index.html

⚠️ Khi dùng backend thật, cần chỉnh BASE_URL trong JS về:

http://127.0.0.1:8000

📌 Ghi chú

Dự án tập trung vào Backend API

Frontend chỉ mang tính minh họa

Phù hợp cho bài tập / đồ án môn học về Web / API / Cloud / Backend

👤 Tác giả

Sinh viên thực hiện: Nguyễn Trường An

                        Nguyễn Thị Bích Quyên

Môn học: Xây dựng hệ thống / Phát triển ứng dụng Web

---