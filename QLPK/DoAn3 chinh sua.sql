CREATE DATABASE QuanLyPhongKham;
GO
USE QuanLyPhongKham;
GO

------------------------------------------------
-- 1. Vai trò
------------------------------------------------
CREATE TABLE VaiTro
(
    MaVaiTro INT IDENTITY PRIMARY KEY,
    TenVaiTro NVARCHAR(50) NOT NULL UNIQUE
);

------------------------------------------------
-- 2. Người dùng
------------------------------------------------
CREATE TABLE NguoiDung
(
    MaNguoiDung INT IDENTITY PRIMARY KEY,
    TenDangNhap NVARCHAR(100) UNIQUE NOT NULL,
    MatKhau NVARCHAR(255) NOT NULL,
    HoTen NVARCHAR(150),
    DienThoai NVARCHAR(20),
    Email NVARCHAR(150),
    TrangThai BIT DEFAULT 1,
    NgayTao DATETIME DEFAULT GETDATE()
);

------------------------------------------------
-- 3. Người dùng - Vai trò
------------------------------------------------
CREATE TABLE NguoiDungVaiTro
(
    MaNguoiDung INT,
    MaVaiTro INT,
    PRIMARY KEY(MaNguoiDung, MaVaiTro),
    FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY(MaVaiTro) REFERENCES VaiTro(MaVaiTro)
);

------------------------------------------------
-- 4. Chuyên khoa
------------------------------------------------
CREATE TABLE ChuyenKhoa
(
    MaChuyenKhoa INT IDENTITY PRIMARY KEY,
    TenChuyenKhoa NVARCHAR(200),
    MoTa NVARCHAR(500)
);

------------------------------------------------
-- 5. Bác sĩ
------------------------------------------------
CREATE TABLE BacSi
(
    MaBacSi INT IDENTITY PRIMARY KEY,
    MaNguoiDung INT UNIQUE,
    MaChuyenKhoa INT,
    BangCap NVARCHAR(200),
    SoNamKinhNghiem INT,
    MoTa NVARCHAR(500),
    FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY(MaChuyenKhoa) REFERENCES ChuyenKhoa(MaChuyenKhoa)
);

------------------------------------------------
-- 6. Bệnh nhân
------------------------------------------------
CREATE TABLE BenhNhan
(
    MaBenhNhan INT IDENTITY PRIMARY KEY,
    MaNguoiDung INT UNIQUE,
    NgaySinh DATE,
    GioiTinh NVARCHAR(10),
    DiaChi NVARCHAR(300),
    FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

------------------------------------------------
-- 7. Hồ sơ bệnh nhân
------------------------------------------------
CREATE TABLE HoSoBenhNhan
(
    MaHoSo INT IDENTITY PRIMARY KEY,
    MaBenhNhan INT,
    TienSuBenh NVARCHAR(500),
    DiUngThuoc NVARCHAR(500),
    GhiChu NVARCHAR(500),
    FOREIGN KEY(MaBenhNhan) REFERENCES BenhNhan(MaBenhNhan)
);

------------------------------------------------
-- 8. Lịch làm việc bác sĩ
------------------------------------------------
CREATE TABLE LichLamViec
(
    MaLich INT IDENTITY PRIMARY KEY,
    MaBacSi INT,
    NgayLam DATE,
    GioBatDau TIME,
    GioKetThuc TIME,
    SoLuongToiDa INT,
    FOREIGN KEY(MaBacSi) REFERENCES BacSi(MaBacSi)
);

------------------------------------------------
-- 9. Lịch hẹn khám
------------------------------------------------
CREATE TABLE LichHen
(
    MaLichHen INT IDENTITY PRIMARY KEY,
    MaBenhNhan INT,
    MaBacSi INT,
    MaLich INT,
    ThoiGianHen DATETIME,
    TrangThai NVARCHAR(50),
    NgayDat DATETIME DEFAULT GETDATE(),
    FOREIGN KEY(MaBenhNhan) REFERENCES BenhNhan(MaBenhNhan),
    FOREIGN KEY(MaBacSi) REFERENCES BacSi(MaBacSi),
    FOREIGN KEY(MaLich) REFERENCES LichLamViec(MaLich)
);

------------------------------------------------
-- 10. Hồ sơ khám bệnh
------------------------------------------------
CREATE TABLE HoSoKhamBenh
(
    MaHoSoKham INT IDENTITY PRIMARY KEY,
    MaLichHen INT,
    TrieuChung NVARCHAR(500),
    ChanDoan NVARCHAR(500),
    GhiChu NVARCHAR(500),
    NgayKham DATETIME DEFAULT GETDATE(),
    FOREIGN KEY(MaLichHen) REFERENCES LichHen(MaLichHen)
);

------------------------------------------------
-- 11. Dịch vụ
------------------------------------------------
CREATE TABLE DichVu
(
    MaDichVu INT IDENTITY PRIMARY KEY,
    TenDichVu NVARCHAR(200),
    Gia DECIMAL(18,2),
    MoTa NVARCHAR(500)
);

------------------------------------------------
-- 12. Chi tiết dịch vụ
------------------------------------------------
CREATE TABLE ChiTietDichVu
(
    MaChiTiet INT IDENTITY PRIMARY KEY,
    MaHoSoKham INT,
    MaDichVu INT,
    SoLuong INT,
    FOREIGN KEY(MaHoSoKham) REFERENCES HoSoKhamBenh(MaHoSoKham),
    FOREIGN KEY(MaDichVu) REFERENCES DichVu(MaDichVu)
);

------------------------------------------------
-- 13. Danh mục thuốc
------------------------------------------------
CREATE TABLE DanhMucThuoc
(
    MaDanhMuc INT IDENTITY PRIMARY KEY,
    TenDanhMuc NVARCHAR(200)
);

------------------------------------------------
-- 14. Thuốc
------------------------------------------------
CREATE TABLE Thuoc
(
    MaThuoc INT IDENTITY PRIMARY KEY,
    TenThuoc NVARCHAR(200),
    DonViTinh NVARCHAR(50),
    Gia DECIMAL(18,2),
    MaDanhMuc INT,
    FOREIGN KEY(MaDanhMuc) REFERENCES DanhMucThuoc(MaDanhMuc)
);

------------------------------------------------
-- 15. Đơn thuốc
------------------------------------------------
CREATE TABLE DonThuoc
(
    MaDonThuoc INT IDENTITY PRIMARY KEY,
    MaHoSoKham INT,
    NgayKe DATETIME DEFAULT GETDATE(),
    FOREIGN KEY(MaHoSoKham) REFERENCES HoSoKhamBenh(MaHoSoKham)
);

------------------------------------------------
-- 16. Chi tiết đơn thuốc
------------------------------------------------
CREATE TABLE ChiTietDonThuoc
(
    MaChiTiet INT IDENTITY PRIMARY KEY,
    MaDonThuoc INT,
    MaThuoc INT,
    SoLuong INT,
    CachDung NVARCHAR(300),
    FOREIGN KEY(MaDonThuoc) REFERENCES DonThuoc(MaDonThuoc),
    FOREIGN KEY(MaThuoc) REFERENCES Thuoc(MaThuoc)
);

------------------------------------------------
-- 17. Kho thuốc
------------------------------------------------
CREATE TABLE KhoThuoc
(
    MaKho INT IDENTITY PRIMARY KEY,
    TenKho NVARCHAR(200),
    DiaChi NVARCHAR(300)
);

------------------------------------------------
-- 18. Tồn kho
------------------------------------------------
CREATE TABLE TonKho
(
    MaTonKho INT IDENTITY PRIMARY KEY,
    MaKho INT,
    MaThuoc INT,
    SoLuong INT,
    FOREIGN KEY(MaKho) REFERENCES KhoThuoc(MaKho),
    FOREIGN KEY(MaThuoc) REFERENCES Thuoc(MaThuoc)
);

------------------------------------------------
-- 19. Phiếu nhập thuốc
------------------------------------------------
CREATE TABLE PhieuNhapThuoc
(
    MaPhieuNhap INT IDENTITY PRIMARY KEY,
    NgayNhap DATETIME DEFAULT GETDATE(),
    NhaCungCap NVARCHAR(200),
    NguoiNhap NVARCHAR(200)
);

------------------------------------------------
-- 20. Chi tiết phiếu nhập
------------------------------------------------
CREATE TABLE ChiTietPhieuNhap
(
    MaChiTiet INT IDENTITY PRIMARY KEY,
    MaPhieuNhap INT,
    MaThuoc INT,
    SoLuong INT,
    GiaNhap DECIMAL(18,2),
    FOREIGN KEY(MaPhieuNhap) REFERENCES PhieuNhapThuoc(MaPhieuNhap),
    FOREIGN KEY(MaThuoc) REFERENCES Thuoc(MaThuoc)
);

------------------------------------------------
-- 21. Hóa đơn
------------------------------------------------
CREATE TABLE HoaDon
(
    MaHoaDon INT IDENTITY PRIMARY KEY,
    MaLichHen INT,
    TongTien DECIMAL(18,2),
    TrangThai NVARCHAR(50),
    NgayThanhToan DATETIME,
    FOREIGN KEY(MaLichHen) REFERENCES LichHen(MaLichHen)
);

------------------------------------------------
-- 22. Chi tiết hóa đơn
------------------------------------------------
CREATE TABLE ChiTietHoaDon
(
    MaChiTiet INT IDENTITY PRIMARY KEY,
    MaHoaDon INT,
    TenMuc NVARCHAR(200),
    SoLuong INT,
    Gia DECIMAL(18,2),
    FOREIGN KEY(MaHoaDon) REFERENCES HoaDon(MaHoaDon)
);