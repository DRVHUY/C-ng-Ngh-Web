# API Quản Lý Phòng Khám - Tài Liệu Thêm

## Cấu Trúc Database

Database: `QuanLyPhongKham` gồm 22 bảng:

### 1. Quản Lý Người Dùng
- **VaiTro**: Danh sách các vai trò (Admin, BacSi, BenhNhan, etc.)
- **NguoiDung**: Tài khoản người dùng (TenDangNhap, MatKhau, HoTen, etc.)
- **NguoiDungVaiTro**: Mapping nhiều vai trò cho một người dùng

### 2. Quản Lý Bác Sĩ & Chuyên Khoa
- **ChuyenKhoa**: Các chuyên khoa (Tim mạch, Ngoại khoa, etc.)
- **BacSi**: Thông tin bác sĩ (BangCap, KinhNghiem, etc.)
- **LichLamViec**: Lịch làm việc của bác sĩ

### 3. Quản Lý Bệnh Nhân
- **BenhNhan**: Thông tin bệnh nhân (NgaySinh, GioiTinh, DiaChi)
- **HoSoBenhNhan**: Tiền sử bệnh, dị ứng, ghi chú
- **HoSoKhamBenh**: Chi tiết khám bệnh (TrieuChung, ChanDoan)

### 4. Quản Lý Lịch Hẹn & Khám
- **LichHen**: Lịch hẹn khám (ThoiGianHen, TrangThai)
- **HoSoKhamBenh**: Kết quả khám bệnh

### 5. Quản Lý Dịch Vụ
- **DichVu**: Các dịch vụ khám chữa bệnh (Gia)
- **ChiTietDichVu**: Chi tiết dịch vụ trong hóa đơn

### 6. Quản Lý Thuốc & Kho
- **DanhMucThuoc**: Danh mục thuốc
- **Thuoc**: Danh sách thuốc (TenThuoc, DonViTinh, Gia)
- **KhoThuoc**: Kho lưu trữ thuốc
- **TonKho**: Số lượng thuốc tồn

### 7. Quản Lý Đơn Thuốc
- **DonThuoc**: Các đơn thuốc được kê
- **ChiTietDonThuoc**: Chi tiết từng loại thuốc trong đơn

### 8. Quản Lý Phiếu Nhập Thuốc
- **PhieuNhapThuoc**: Phiếu nhập từ nhà cung cấp
- **ChiTietPhieuNhap**: Chi tiết từng loại thuốc nhập

### 9. Quản Lý Hóa Đơn
- **HoaDon**: Hóa đơn thanh toán
- **ChiTietHoaDon**: Chi tiết từng mục trong hóa đơn

## Quy Trình Workflow

### 1. Workflow Khám Bệnh
```
1. Bệnh nhân đăng ký → NguoiDung + BenhNhan
2. Đặt lịch hẹn → LichHen
3. Bác sĩ khám bệnh → HoSoKhamBenh
4. Kê đơn thuốc → DonThuoc + ChiTietDonThuoc
5. Tính tiền → HoaDon + ChiTietHoaDon
```

### 2. Workflow Quản Lý Thuốc
```
1. Nhà cung cấp cung cấp → PhieuNhapThuoc
2. Nhập vào kho → TonKho
3. Kê đơn sử dụng → DonThuoc
4. Cập nhật tồn kho
```

## Lớp Người Dùng

```
1. Admin (Quản Lý Hệ Thống)
   - Quản lý người dùng
   - Quản lý bác sĩ, bệnh nhân
   - Báo cáo thống kê

2. Bác Sĩ
   - Xem lịch hẹn
   - Nhập thông tin khám
   - Kê đơn thuốc

3. Bệnh Nhân
   - Xem lịch hẹn
   - Xem hóa đơn
   - Xem lịch sử khám

4. Nhân Viên Tiền Sảnh
   - Quản lý lịch hẹn
   - Hỗ trợ đăng ký

5. Thu Ngân
   - Xem hóa đơn
   - Xử lý thanh toán

6. Kho Thuốc
   - Quản lý thuốc
   - Quản lý tồn kho
   - Tiếp nhận phiếu nhập
```

## Repositories Cần Tạo Thêm

Những repositories dưới đây cần được tạo để hoàn chỉnh:

- [ ] VaiTroRepository
- [ ] NguoiDungVaiTroRepository
- [ ] LichLamViecRepository
- [ ] HoSoBenhNhanRepository
- [ ] HoSoKhamBenhRepository
- [ ] ChiTietDichVuRepository
- [ ] DanhMucThuocRepository
- [ ] DonThuocRepository
- [ ] ChiTietDonThuocRepository
- [ ] KhoThuocRepository
- [ ] TonKhoRepository
- [ ] PhieuNhapThuocRepository
- [ ] ChiTietPhieuNhapRepository
- [ ] ChiTietHoaDonRepository

## Services Cần Tạo Thêm

- [ ] VaiTroService
- [ ] LichLamViecService
- [ ] HoSoBenhNhanService
- [ ] HoSoKhamBenhService
- [ ] DonThuocService
- [ ] KhoThuocService
- [ ] PhieuNhapThuocService

## Controllers Cần Tạo Thêm

- [ ] VaiTroController
- [ ] LichLamViecController
- [ ] HoSoBenhNhanController
- [ ] HoSoKhamBenhController
- [ ] DonThuocController
- [ ] KhoThuocController
- [ ] PhieuNhapThuocController

## Các Chức Năng Mở Rộng

### 1. Authentication & Authorization
```typescript
- JWT token generation
- Role-based access control (RBAC)
- Middleware bảo vệ routes
- Refresh token
```

### 2. Thống Kê & Báo Cáo
```
- Số lượng khám bệnh theo ngày/tháng
- Doanh thu theo bác sĩ
- Thuốc bán chạy
- Bệnh nhân lâu dài
```

### 3. Tích Hợp Thêm
```
- Email notification
- SMS thông báo lịch hẹn
- Payment gateway (Stripe, VNPay)
- File export (PDF, Excel)
```

### 4. Logging & Monitoring
```
- Request/Response logging
- Error tracking
- Performance monitoring
- Audit trail
```

## Các Cách Mở Rộng Project

### Thêm Pagination
```typescript
// Trong Repository
async getAll(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  const result = await pool
    .request()
    .query(`SELECT * FROM Table OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`);
  return result.recordset;
}
```

### Thêm Search/Filter
```typescript
async search(keyword: string) {
  const result = await pool
    .request()
    .input('keyword', sql.NVarChar, `%${keyword}%`)
    .query(`SELECT * FROM Table WHERE TenTruong LIKE @keyword`);
  return result.recordset;
}
```

### Thêm Sorting
```typescript
async getAll(sortBy: string, sortOrder: 'ASC' | 'DESC') {
  const result = await pool
    .request()
    .query(`SELECT * FROM Table ORDER BY ${sortBy} ${sortOrder}`);
  return result.recordset;
}
```

## Công Cụ Testing

```bash
# Sử dụng Postman/Thunder Client để test API
# Hoặc dùng curl từ command line
```

## Troubleshooting

### Error: "Unable to connect to server"
- Kiểm tra SQL Server đang chạy
- Kiểm tra .env có đúng credentials

### Error: "Database not found"
- Chạy script DoAn3 chinh sua.sql để tạo database

### Error: "Port already in use"
- Thay đổi PORT trong .env
- Hoặc kill process đang sử dụng port 7000

## Next Steps

1. ✅ Setup cấu trúc cơ bản (DONE)
2. ✅ Tạo 3 repositories chính (DONE)
3. ✅ Tạo 3 services và controllers (DONE)
4. ⏳ Tạo các repositories/services/controllers còn lại
5. ⏳ Thêm authentication & authorization
6. ⏳ Thêm validation & error handling nâng cao
7. ⏳ Thêm unit tests
8. ⏳ Deploy lên server thực

---

Happy Coding! 🚀
