// Các loại vai trò
export type UserRole = 'Admin' | 'BacSi' | 'NhanVien' | 'BenhNhan';

// User Login Response (cập nhật để phù hợp với backend mới)
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    success: boolean;
    token: string;
    user: NguoiDung;
  };
}

// User Info
export interface NguoiDung {
  MaNguoiDung: number;
  TenDangNhap: string;
  HoTen: string;
  DienThoai: string;
  Email: string;
  TrangThai: boolean;
  NgayTao: string;
  DiaChi?: string;
  NgaySinh?: string;
  GioiTinh?: string;
  VaiTro?: UserRole;
}

// Auth Context Type
export interface AuthContextType {
  user: NguoiDung | null;
  token: string | null;
  role: UserRole | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (tenDangNhap: string, matKhau: string) => Promise<void>;
  logout: () => void;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// BacSi Info
export interface BacSi {
  MaBacSi: number;
  MaNguoiDung: number;
  MaChuyenKhoa: number;
  BangCap: string;
  SoNamKinhNghiem: number;
  MoTa: string;
}

// BenhNhan Info
export interface BenhNhan {
  MaBenhNhan: number;
  MaNguoiDung: number;
  NgaySinh: string;
  GioiTinh: string;
  DiaChi: string;
}

// BenhNhan Extended (with user info)
export interface BenhNhanExt extends BenhNhan {
  HoTen?: string;
  DienThoai?: string;
  Email?: string;
}

// LichHen Info
export interface LichHen {
  MaLichHen: number;
  MaBenhNhan: number;
  MaBacSi: number;
  MaLich: number;
  ThoiGianHen: string;
  TrangThai: string;
  NgayDat: string;
  LyDo?: string;
  NgayKham?: string;
  GioKham?: string;
}

// ChuyenKhoa
export interface ChuyenKhoa {
  MaChuyenKhoa: number;
  TenChuyenKhoa: string;
  MoTa: string;
}

// DonThuoc (Đơn Thuốc/Prescription)
export interface DonThuoc {
  MaDonThuoc: number;
  MaLichHen: number;
  NgayCapDon: string;
  GhiChu?: string;
  TrangThai: string;
}

// HoaDon
export interface HoaDon {
  MaHoaDon: number;
  MaLichHen: number;
  TongTien: number;
  TrangThai: string;
  NgayThanhToan: string | null;
}

// HoSoBenhNhan
export interface HoSoBenhNhan {
  MaHoSo: number;
  MaBenhNhan: number;
  TienSuBenh: string;
  DiUngThuoc: string;
  GhiChu: string;
}

// HoSoKhamBenh
export interface HoSoKhamBenh {
  MaHoSoKham: number;
  MaLichHen: number;
  TrieuChung: string;
  ChanDoan: string;
  GhiChu: string;
  NgayKham: string;
}

// DanhMucThuoc
export interface DanhMucThuoc {
  MaDanhMuc: number;
  TenDanhMuc: string;
}

// Thuoc
export interface Thuoc {
  MaThuoc: number;
  TenThuoc: string;
  DonViTinh: string;
  Gia: number;
  MaDanhMuc: number;
}

// DonThuoc
export interface DonThuoc {
  MaDonThuoc: number;
  MaHoSoKham: number;
  NgayKe: string;
}

// ChiTietDonThuoc
export interface ChiTietDonThuoc {
  MaChiTiet: number;
  MaDonThuoc: number;
  MaThuoc: number;
  SoLuong: number;
  CachDung: string;
  LieuLuong: string;
}

// TonKho
export interface TonKho {
  MaTonKho: number;
  MaThuoc: number;
  SoLuongTon: number;
  NgayCapNhat: string;
}

// PhieuNhapThuoc
export interface PhieuNhapThuoc {
  MaPhieuNhap: number;
  NgayNhap: string;
  NhaCungCap: string;
  TongTien: number;
  GhiChu: string;
}

// ChiTietPhieuNhap
export interface ChiTietPhieuNhap {
  MaChiTiet: number;
  MaPhieuNhap: number;
  MaThuoc: number;
  SoLuong: number;
  GiaNhap: number;
  HanSuDung: string;
}
