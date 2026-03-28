-- Demo Data cho QLPK - Quan Ly Phong Kham
-- Chạy sau khi tạo database và tables

USE QuanLyPhongKham;
GO

-- 1. Thêm vai trò
INSERT INTO VaiTro (TenVaiTro) VALUES
('Admin'),
('BacSi'),
('NhanVien'),
('BenhNhan');
GO

-- 2. Thêm người dùng demo (passwords đã được hash)
-- Password cho tất cả: '123456' (đã hash bằng bcrypt)
INSERT INTO NguoiDung (TenDangNhap, MatKhau, HoTen, DienThoai, Email, TrangThai) VALUES
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', '0123456789', 'admin@qlpk.com', 1),
('bacsi01', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nguyễn Văn Bác Sĩ', '0987654321', 'bacsi01@qlpk.com', 1),
('nhanvien01', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Trần Thị Nhân Viên', '0912345678', 'nhanvien01@qlpk.com', 1),
('benhnhan01', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lê Văn Bệnh Nhân', '0901234567', 'benhnhan01@qlpk.com', 1);
GO

-- 3. Gán vai trò cho người dùng
INSERT INTO NguoiDungVaiTro (MaNguoiDung, MaVaiTro) VALUES
(1, 1), -- admin -> Admin
(2, 2), -- bacsi01 -> BacSi
(3, 3), -- nhanvien01 -> NhanVien
(4, 4); -- benhnhan01 -> BenhNhan
GO

-- 4. Thêm chuyên khoa
INSERT INTO ChuyenKhoa (TenChuyenKhoa, MoTa) VALUES
('Nội khoa', 'Khám và điều trị các bệnh nội khoa'),
('Nhi khoa', 'Khám và điều trị trẻ em'),
('Sản phụ khoa', 'Khám thai sản và phụ khoa'),
('Da liễu', 'Khám và điều trị bệnh da');
GO

-- 5. Thêm bác sĩ
INSERT INTO BacSi (MaNguoiDung, MaChuyenKhoa, BangCap, SoNamKinhNghiem, MoTa) VALUES
(2, 1, 'Bác sĩ chuyên khoa Nội', 5, 'Bác sĩ có 5 năm kinh nghiệm trong lĩnh vực nội khoa');
GO

-- 6. Thêm bệnh nhân
INSERT INTO BenhNhan (MaNguoiDung, NgaySinh, GioiTinh, DiaChi) VALUES
(4, '1990-01-01', 'Nam', '123 Đường ABC, Quận 1, TP.HCM');
GO

-- 7. Thêm hồ sơ bệnh nhân
INSERT INTO HoSoBenhNhan (MaBenhNhan, TienSuBenh, DiUngThuoc, GhiChu) VALUES
(1, 'Không có tiền sử bệnh', 'Không dị ứng thuốc', 'Bệnh nhân khỏe mạnh');
GO

-- 8. Thêm dịch vụ
INSERT INTO DichVu (TenDichVu, Gia, MoTa) VALUES
('Khám nội khoa', 100000, 'Khám tổng quát nội khoa'),
('Khám nhi khoa', 120000, 'Khám tổng quát nhi khoa'),
('Siêu âm bụng', 200000, 'Siêu âm bụng tổng quát');
GO

-- 9. Thêm danh mục thuốc
INSERT INTO DanhMucThuoc (TenDanhMuc) VALUES
('Thuốc giảm đau'),
('Thuốc kháng sinh'),
('Thuốc vitamin');
GO

-- 10. Thêm thuốc
INSERT INTO Thuoc (TenThuoc, DonViTinh, Gia, MaDanhMuc) VALUES
('Paracetamol', 'Viên', 5000, 1),
('Amoxicillin', 'Viên', 15000, 2),
('Vitamin C', 'Viên', 8000, 3);
GO

-- Thông báo hoàn thành
PRINT 'Demo data đã được thêm thành công!';
PRINT 'Tài khoản test:';
PRINT 'Admin: admin / 123456';
PRINT 'Bác sĩ: bacsi01 / 123456';
PRINT 'Nhân viên: nhanvien01 / 123456';
PRINT 'Bệnh nhân: benhnhan01 / 123456';
GO