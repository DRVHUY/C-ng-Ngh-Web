# API Quản Lý Phòng Khám

API REST Node.js theo mô hình **3-Tier Architecture** để quản lý phòng khám với database SQL Server.

## 📋 Mục Lục

- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Mô Hình 3-Tier Architecture](#mô-hình-3-tier-architecture)
- [API Endpoints](#api-endpoints)
- [Các Models](#các-models)
- [Hướng Dẫn Phát Triển](#hướng-dẫn-phát-triển)

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js v16+
- npm hoặc yarn
- SQL Server 2019+
- Database: `QuanLyPhongKham`

### Bước 1: Clone/Tạo Project
```bash
cd d:\1242TN\API-QuanLyPhongKham
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Tạo File .env
```bash
# Copy .env.example thành .env
cp .env.example .env
```

Cập nhật file `.env` với thông tin database của bạn:
```env
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=your_password
DB_NAME=QuanLyPhongKham
DB_PORT=1433
JWT_SECRET=your_secret_key
PORT=7000
```

### Bước 4: Tạo Database
```sql
-- Chạy script DoAn3 chinh sua.sql để tạo database và tables
```

### Bước 5: Chạy Server
```bash
# Chế độ development
npm run dev

# Chế độ production
npm run build
npm start
```

Server sẽ chạy tại `http://localhost:7000`

## 📁 Cấu Trúc Dự Án

```
API-QuanLyPhongKham/
├── src/
│   ├── config/
│   │   └── database.ts          # Cấu hình kết nối SQL Server
│   │
│   ├── models/
│   │   └── index.ts             # Các TypeScript Interfaces
│   │
│   ├── repositories/
│   │   ├── NguoiDungRepository.ts
│   │   ├── BacSiRepository.ts
│   │   ├── BenhNhanRepository.ts
│   │   ├── ChuyenKhoaRepository.ts
│   │   ├── LichHenRepository.ts
│   │   ├── ThuocRepository.ts    # (DichVu)
│   │   └── HoaDonRepository.ts
│   │
│   ├── services/
│   │   ├── NguoiDungService.ts
│   │   ├── BacSiService.ts
│   │   ├── BenhNhanService.ts
│   │   ├── ChuyenKhoaService.ts
│   │   ├── DichVuService.ts      # (LichHen Service)
│   │   └── HoaDonService.ts
│   │
│   ├── controllers/
│   │   ├── NguoiDungController.ts
│   │   ├── BacSiController.ts
│   │   ├── BenhNhanController.ts
│   │   ├── ChuyenKhoaController.ts
│   │   ├── LichHenController.ts
│   │   └── HoaDonController.ts
│   │
│   ├── routes/
│   │   ├── index.ts             # Route chính
│   │   ├── nguoiDung.ts
│   │   ├── bacSi.ts
│   │   ├── benhNhan.ts
│   │   ├── chuyenKhoa.ts
│   │   ├── lichHen.ts
│   │   └── hoaDon.ts
│   │
│   ├── middlewares/
│   │   └── errorHandler.ts      # Error handling & 404
│   │
│   ├── utils/
│   │   └── query.ts             # (Dành cho mở rộng)
│   │
│   └── app.ts                   # Express app chính
│
├── dist/                        # Compiled JavaScript
├── .env                         # Biến môi trường (tạo từ .env.example)
├── .env.example                 # Mẫu biến môi trường
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Mô Hình 3-Tier Architecture

### Tầng 1: Presentation Layer (Controllers)
- Xử lý HTTP requests/responses
- Validate input từ client
- Gọi Service tương ứng

### Tầng 2: Business Logic Layer (Services)
- Xử lý các business rules
- Validate business logic
- Gọi Repository để truy cập dữ liệu

### Tầng 3: Data Access Layer (Repositories)
- Thực hiện các truy vấn SQL trực tiếp
- Mapping dữ liệu từ database
- Không chứa business logic

## 📡 API Endpoints

### 1. Người Dùng (NguoiDung)
```
GET    /api/nguoi-dung              # Lấy tất cả
GET    /api/nguoi-dung/:id          # Lấy theo ID
POST   /api/nguoi-dung              # Tạo mới
POST   /api/nguoi-dung/dang-nhap    # Đăng nhập
PUT    /api/nguoi-dung/:id          # Cập nhật
DELETE /api/nguoi-dung/:id          # Xóa
```

**Request Body (Tạo):**
```json
{
  "TenDangNhap": "username",
  "MatKhau": "password",
  "HoTen": "Họ tên",
  "DienThoai": "0912345678",
  "Email": "email@example.com",
  "TrangThai": true
}
```

### 2. Bác Sĩ (BacSi)
```
GET    /api/bac-si                  # Lấy tất cả
GET    /api/bac-si/:id              # Lấy theo ID
GET    /api/bac-si/chuyen-khoa/:maChuyenKhoa  # Theo chuyên khoa
POST   /api/bac-si                  # Tạo mới
PUT    /api/bac-si/:id              # Cập nhật
DELETE /api/bac-si/:id              # Xóa
```

**Request Body:**
```json
{
  "MaNguoiDung": 1,
  "MaChuyenKhoa": 1,
  "BangCap": "Bằng cấp",
  "SoNamKinhNghiem": 5,
  "MoTa": "Mô tả"
}
```

### 3. Bệnh Nhân (BenhNhan)
```
GET    /api/benh-nhan               # Lấy tất cả
GET    /api/benh-nhan/:id           # Lấy theo ID
POST   /api/benh-nhan               # Tạo mới
PUT    /api/benh-nhan/:id           # Cập nhật
DELETE /api/benh-nhan/:id           # Xóa
```

**Request Body:**
```json
{
  "MaNguoiDung": 1,
  "NgaySinh": "1990-01-15",
  "GioiTinh": "Nam",
  "DiaChi": "Địa chỉ"
}
```

### 4. Chuyên Khoa (ChuyenKhoa)
```
GET    /api/chuyen-khoa             # Lấy tất cả
GET    /api/chuyen-khoa/:id         # Lấy theo ID
POST   /api/chuyen-khoa             # Tạo mới
PUT    /api/chuyen-khoa/:id         # Cập nhật
DELETE /api/chuyen-khoa/:id         # Xóa
```

### 5. Lịch Hẹn (LichHen)
```
GET    /api/lich-hen                # Lấy tất cả
GET    /api/lich-hen/:id            # Lấy theo ID
GET    /api/lich-hen/benh-nhan/:maBenhNhan  # Theo bệnh nhân
POST   /api/lich-hen                # Tạo mới
PUT    /api/lich-hen/:id            # Cập nhật
DELETE /api/lich-hen/:id            # Xóa
```

### 6. Hóa Đơn (HoaDon)
```
GET    /api/hoa-don                 # Lấy tất cả
GET    /api/hoa-don/:id             # Lấy theo ID
POST   /api/hoa-don                 # Tạo mới
PUT    /api/hoa-don/:id             # Cập nhật
DELETE /api/hoa-don/:id             # Xóa
```

### Health Check
```
GET    /api/health                  # Kiểm tra trạng thái API
GET    /                            # Trang chủ API
```

## 📊 Các Models

### VaiTro
```typescript
MaVaiTro: number
TenVaiTro: string
```

### NguoiDung
```typescript
MaNguoiDung: number
TenDangNhap: string
MatKhau: string
HoTen: string
DienThoai: string
Email: string
TrangThai: boolean
NgayTao: Date
```

### BacSi
```typescript
MaBacSi: number
MaNguoiDung: number
MaChuyenKhoa: number
BangCap: string
SoNamKinhNghiem: number
MoTa: string
```

### BenhNhan
```typescript
MaBenhNhan: number
MaNguoiDung: number
NgaySinh: Date
GioiTinh: string
DiaChi: string
```

### ChuyenKhoa
```typescript
MaChuyenKhoa: number
TenChuyenKhoa: string
MoTa: string
```

### LichHen
```typescript
MaLichHen: number
MaBenhNhan: number
MaBacSi: number
MaLich: number
ThoiGianHen: Date
TrangThai: string
NgayDat: Date
```

### HoaDon
```typescript
MaHoaDon: number
MaLichHen: number
TongTien: number
TrangThai: string
NgayThanhToan: Date
```

## 🛠️ Hướng Dẫn Phát Triển

### Thêm Repository Mới
1. Tạo file trong `src/repositories/` (vd: `ThuocRepository.ts`)
2. Implement các method CRUD

### Thêm Service Mới
1. Tạo file trong `src/services/`
2. Import Repository tương ứng
3. Implement business logic

### Thêm Controller Mới
1. Tạo file trong `src/controllers/`
2. Import Service tương ứng
3. Implement HTTP handlers

### Thêm Route Mới
1. Tạo file trong `src/routes/`
2. Import Controller
3. Define các endpoints
4. Import vào `src/routes/index.ts`

## 📝 Ví Dụ Sử Dụng

### Tạo Người Dùng
```bash
curl -X POST http://localhost:7000/api/nguoi-dung \
  -H "Content-Type: application/json" \
  -d '{
    "TenDangNhap": "doctor01",
    "MatKhau": "password123",
    "HoTen": "Nguyễn Văn A",
    "DienThoai": "0912345678",
    "Email": "doctor@example.com"
  }'
```

### Lấy Tất Cả Bác Sĩ
```bash
curl http://localhost:7000/api/bac-si
```

### Đăng Nhập
```bash
curl -X POST http://localhost:7000/api/nguoi-dung/dang-nhap \
  -H "Content-Type: application/json" \
  -d '{
    "TenDangNhap": "doctor01",
    "MatKhau": "password123"
  }'
```

## 🔐 Bảo Mật

- ✓ Mật khẩu được mã hóa với bcrypt
- ✓ Input validation trên tất cả endpoints
- ✓ Error handling tập trung
- ⚠️ JWT authentication (cần thiết lập thêm)

## 📚 Công Nghệ Sử Dụng

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQL Server (mssql)
- **Authentication**: bcryptjs, jsonwebtoken
- **Others**: CORS, body-parser, dotenv

## 🔗 Liên Kết

- Database SQL: `DoAn3 chinh sua.sql`
- Frontend: `admin/`, `FE - Class/`

## 📧 Hỗ Trợ

Nếu có vấn đề, vui lòng kiểm tra:
1. File `.env` đã cấu hình đúng
2. SQL Server đang chạy
3. Database `QuanLyPhongKham` đã được tạo
4. Cảng 7000 không bị chiếm dụng

---

**Version**: 1.0.0  
**Author**: Development Team  
**Last Updated**: 2026-03-22
