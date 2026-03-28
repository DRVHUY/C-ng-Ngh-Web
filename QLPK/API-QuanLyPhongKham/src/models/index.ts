// Models cho các entities
export interface VaiTro {
  MaVaiTro: number;
  TenVaiTro: string;
}

export interface NguoiDung {
  MaNguoiDung: number;
  TenDangNhap: string;
  MatKhau: string;
  HoTen: string;
  DienThoai: string;
  Email: string;
  TrangThai: boolean;
  NgayTao: Date;
  VaiTro?: string; // Vai trò chính của người dùng
}

export interface NguoiDungVaiTro {
  MaNguoiDung: number;
  MaVaiTro: number;
}

export interface ChuyenKhoa {
  MaChuyenKhoa: number;
  TenChuyenKhoa: string;
  MoTa: string;
}

export interface BacSi {
  MaBacSi: number;
  MaNguoiDung: number;
  MaChuyenKhoa: number;
  BangCap: string;
  SoNamKinhNghiem: number;
  MoTa: string;
}

export interface BenhNhan {
  MaBenhNhan: number;
  MaNguoiDung: number;
  NgaySinh: Date;
  GioiTinh: string;
  DiaChi: string;
}

export interface HoSoBenhNhan {
  MaHoSo: number;
  MaBenhNhan: number;
  TienSuBenh: string;
  DiUngThuoc: string;
  GhiChu: string;
}

export interface LichLamViec {
  MaLich: number;
  MaBacSi: number;
  NgayLam: Date;
  GioBatDau: string;
  GioKetThuc: string;
  SoLuongToiDa: number;
}

export interface LichHen {
  MaLichHen: number;
  MaBenhNhan: number;
  MaBacSi: number;
  MaLich: number;
  ThoiGianHen: Date;
  TrangThai: string;
  NgayDat: Date;
}

export interface HoSoKhamBenh {
  MaHoSoKham: number;
  MaLichHen: number;
  TrieuChung: string;
  ChanDoan: string;
  GhiChu: string;
  NgayKham: Date;
}

export interface DichVu {
  MaDichVu: number;
  TenDichVu: string;
  Gia: number;
  MoTa: string;
}

export interface ChiTietDichVu {
  MaChiTiet: number;
  MaHoSoKham: number;
  MaDichVu: number;
  SoLuong: number;
}

export interface DanhMucThuoc {
  MaDanhMuc: number;
  TenDanhMuc: string;
}

export interface Thuoc {
  MaThuoc: number;
  TenThuoc: string;
  DonViTinh: string;
  Gia: number;
  MaDanhMuc: number;
}

export interface DonThuoc {
  MaDonThuoc: number;
  MaHoSoKham: number;
  NgayKe: Date;
}

export interface ChiTietDonThuoc {
  MaChiTiet: number;
  MaDonThuoc: number;
  MaThuoc: number;
  SoLuong: number;
  CachDung: string;
}

export interface KhoThuoc {
  MaKho: number;
  TenKho: string;
  DiaChi: string;
}

export interface TonKho {
  MaTonKho: number;
  MaKho: number;
  MaThuoc: number;
  SoLuong: number;
}

export interface PhieuNhapThuoc {
  MaPhieuNhap: number;
  NgayNhap: Date;
  NhaCungCap: string;
  NguoiNhap: string;
}

export interface ChiTietPhieuNhap {
  MaChiTiet: number;
  MaPhieuNhap: number;
  MaThuoc: number;
  SoLuong: number;
  GiaNhap: number;
}

export interface HoaDon {
  MaHoaDon: number;
  MaLichHen: number;
  TongTien: number;
  TrangThai: string;
  NgayThanhToan: Date | null;
}

export interface ChiTietHoaDon {
  MaChiTiet: number;
  MaHoaDon: number;
  TenMuc: string;
  SoLuong: number;
  Gia: number;
}
