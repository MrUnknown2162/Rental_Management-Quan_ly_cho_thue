🏠 QARent – Hệ thống Quản Lý Cho Thuê Nhà / Phòng Trọ

QARent là hệ thống quản lý cho thuê nhà, phòng trọ theo mô hình Backend API (FastAPI) và Frontend Web (HTML/CSS/JS), hỗ trợ:

Đăng ký / đăng nhập người dùng

Xác thực JWT

Quản lý tài sản (Property)

Quản lý phòng (Unit – multi-unit)

Đặt phòng (Booking)

Phân quyền theo chủ sở hữu

🧱 Kiến trúc tổng thể
Frontend (HTML / CSS / JS)
        ↓ REST API
Backend (FastAPI + JWT)
        ↓ ORM
PostgreSQL (SQLAlchemy + Alembic)

⚙️ Công nghệ sử dụng
Backend

FastAPI

PostgreSQL

SQLAlchemy 2.x

Alembic (Migration)

JWT (python-jose)

OAuth2 Password Flow

Pydantic v2

Frontend (demo)

HTML5

CSS3 + Bootstrap 5

JavaScript (fetch API)

LocalStorage (demo)

📂 Cấu trúc thư mục
Rental_Management-Quan_ly_cho_thue/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── property.py
│   │   │   ├── unit.py
│   │   │   └── booking.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── token.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── crud/
│   │   ├── database/
│   │   └── main.py
│   ├── migrations/
│   ├── alembic.ini
│   └── requirements.txt
│
├── frontend/   (demo – HTML/CSS/JS)
│
└── README.md

🚀 Hướng dẫn chạy Backend
1️⃣ Tạo virtual environment
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

2️⃣ Cài thư viện
pip install -r requirements.txt

3️⃣ Tạo file .env
DATABASE_URL=postgresql+psycopg2://rental_user:user123@localhost:5432/rental_db
SECRET_KEY=supersecretkey
ACCESS_TOKEN_EXPIRE_MINUTES=60

4️⃣ Chạy migrate database
alembic upgrade head

5️⃣ Chạy server
uvicorn app.main:app --reload


📌 Truy cập Swagger UI:
👉 http://127.0.0.1:8000/docs

🔐 Luồng xác thực (JWT)

POST /auth/register – Đăng ký

POST /auth/login – Đăng nhập → nhận access_token

Gửi header cho các API cần xác thực:

Authorization: Bearer <access_token>


GET /auth/me – Lấy thông tin user hiện tại

📌 Các API chính
Auth

POST /auth/register

POST /auth/login

GET /auth/me

Property (Tài sản)

POST /properties/

GET /properties/ (chỉ tài sản của user)

Unit (Phòng)

POST /units/

GET /units/by-property/{property_id}

Booking (Đặt phòng)

POST /bookings/

GET /bookings/by-unit/{unit_id}

🧪 Test nhanh bằng Swagger

Đăng nhập tại /auth/login

Copy token

Bấm Authorize (🔒) trong Swagger

Dán token (không cần gõ Bearer)

Test các API khác

🖥️ Frontend (Demo)

Frontend hiện tại dùng để:

Minh họa giao diện

Test luồng API

Chưa áp dụng phân quyền đầy đủ

📌 Chạy frontend:

Mở trực tiếp file .html

Hoặc dùng Live Server (VS Code)

⚠️ Lưu ý quan trọng

Frontend hiện chỉ là demo

Logic chính nằm ở backend

Không dùng localStorage cho production

Có thể thay frontend bằng React/Vue sau

👤 Tác giả

Nguyễn Trường An
Nguyễn Thị Bích Quyên

Sinh viên – Trường Đại học Bình Dương

Dự án học phần / đồ án

📌 Trạng thái dự án

✅ Backend: Hoàn chỉnh (Auth + Property + Unit + Booking)
✅ Frontend: Demo / Backend