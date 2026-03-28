# 🚀 Quick Start - API Quản Lý Phòng Khám

## Bước 1: Chuẩn Bị
```bash
# Mở Command Prompt hoặc PowerShell
cd d:\1242TN\API-QuanLyPhongKham
```

## Bước 2: Cài Đặt Dependencies
```bash
npm install
```

## Bước 3: Cấu Hình Database
1. Mở file `.env` và cập nhật thông tin SQL Server của bạn:
```env
DB_SERVER=localhost          # IP hoặc hostname của SQL Server
DB_USER=sa                   # Username (mặc định là sa)
DB_PASSWORD=your_password    # Mật khẩu
DB_NAME=QuanLyPhongKham     # Database name (giữ nguyên)
DB_PORT=1433               # Port SQL Server (mặc định 1433)
PORT=7000                  # Port API (có thể thay đổi)
```

2. Tạo Database bằng cách chạy script:
```bash
# Mở SQL Server Management Studio hoặc Azure Data Studio
# Chạy file: D:\1242TN\DoAn3 chinh sua.sql
```

## Bước 4: Chạy Server

### Chế Độ Development (có auto-reload)
```bash
npm run dev
```

### Chế Độ Production
```bash
npm run build
npm start
```

✅ Server sẽ chạy tại: **http://localhost:7000**

## 📡 Test API Ngay

### 1. Kiểm Tra Health Status
```bash
curl http://localhost:7000/api/health
```

### 2. Tạo Người Dùng (Bác Sĩ)
```bash
curl -X POST http://localhost:7000/api/nguoi-dung \
  -H "Content-Type: application/json" \
  -d '{
    "TenDangNhap": "baci01",
    "MatKhau": "123456",
    "HoTen": "Nguyễn Văn Sáng",
    "DienThoai": "0912345678",
    "Email": "sang@hospital.com",
    "TrangThai": true
  }'
```

### 3. Đăng Nhập
```bash
curl -X POST http://localhost:7000/api/nguoi-dung/dang-nhap \
  -H "Content-Type: application/json" \
  -d '{
    "TenDangNhap": "baci01",
    "MatKhau": "123456"
  }'
```

### 4. Lấy Danh Sách Bác Sĩ
```bash
curl http://localhost:7000/api/bac-si
```

## 📝 Các API Endpoints Chính

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| GET | `/api/health` | Kiểm tra trạng thái API |
| POST | `/api/nguoi-dung` | Tạo người dùng |
| POST | `/api/nguoi-dung/dang-nhap` | Đăng nhập |
| GET | `/api/bac-si` | Lấy danh sách bác sĩ |
| POST | `/api/bac-si` | Tạo bác sĩ |
| GET | `/api/benh-nhan` | Lấy danh sách bệnh nhân |
| POST | `/api/benh-nhan` | Tạo bệnh nhân |
| POST | `/api/lich-hen` | Đặt lịch hẹn |
| POST | `/api/hoa-don` | Tạo hóa đơn |

## 🛠️ Sử Dụng Postman (Khuyến Nghị)

1. Tải Postman: https://www.postman.com/downloads/
2. Import collection hoặc tạo request:
   - URL: `http://localhost:7000/api/...`
   - Body (JSON):
   ```json
   {
     "TenDangNhap": "username",
     "MatKhau": "password"
   }
   ```

## ⚠️ Troubleshooting

### Error: "Unable to connect to server"
- ✅ Kiểm tra SQL Server đang chạy
- ✅ Kiểm tra credentials trong `.env`
- ✅ Kiểm tra firewall cho port 1433

### Error: "Database QuanLyPhongKham not found"
- ✅ Chạy script SQL tạo database
- ✅ Kiểm tra tên database trong `.env`

### Error: "Port 7000 already in use"
- ✅ Thay đổi PORT trong `.env`
- ✅ Hoặc tắt ứng dụng đang sử dụng port này

### Error: "npm: command not found"
- ✅ Cài đặt Node.js từ https://nodejs.org/
- ✅ Khởi động lại Command Prompt

## 📚 Tài Liệu Thêm

- **Hướng Dẫn Chi Tiết**: Xem file `README.md`
- **Kiến Trúc Database**: Xem file `ARCHITECTURE.md`
- **Models**: Xem file `src/models/index.ts`

## 🎯 Các Bước Tiếp Theo

1. ✅ Setup project (xong)
2. ⚡ Test các endpoints
3. 📝 Thêm repositories/services/controllers cho các entities khác
4. 🔐 Implement JWT authentication
5. ✔️ Thêm input validation
6. 🧪 Viết unit tests
7. 🚀 Deploy lên server

## 📞 Cần Giúp?

- Kiểm tra logs trong console
- Xem file `.env.example` để xem ví dụ cấu hình
- Đọc kỹ error messages

---

**Happy Coding! 🎉**

Nếu tất cả thành công, bạn sẽ thấy:
```
✓ Kết nối Database thành công
✓ Server đang chạy tại port 7000
✓ URL: http://localhost:7000
```
