import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Auth Pages
import Login from './pages/Auth/Login';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageBenhNhan from './pages/Admin/ManageBenhNhan';
import ManageBacSi from './pages/Admin/ManageBacSi';
import ManageNguoiDung from './pages/Admin/ManageNguoiDung';
import ManageChuyenKhoa from './pages/Admin/ManageChuyenKhoa';
import ManageLichHen from './pages/Admin/ManageLichHen';
import ManageHoaDon from './pages/Admin/ManageHoaDon';

// BacSi Pages
import BacSiDashboard from './pages/BacSi/BacSiDashboard';
import LichLamViec from './pages/BacSi/LichLamViec';
import BenhNhanCuaToi from './pages/BacSi/BenhNhanCuaToi';
import QuanLyHoSoKhamBenh from './pages/BacSi/QuanLyHoSoKhamBenh';
import QuanLyDonThuoc from './pages/BacSi/QuanLyDonThuoc';

// NhanVien Pages
import NhanVienDashboard from './pages/NhanVien/NhanVienDashboard';
import LichHenNhanVien from './pages/NhanVien/LichHen';
import BenhNhanNhanVien from './pages/NhanVien/BenhNhan';
import QuanLyDanhMucThuoc from './pages/NhanVien/QuanLyDanhMucThuoc';
import QuanLyThuoc from './pages/NhanVien/QuanLyThuoc';
import QuanLyTonKho from './pages/NhanVien/QuanLyTonKho';
import QuanLyPhieuNhapThuoc from './pages/NhanVien/QuanLyPhieuNhapThuoc';

// Patient Pages
import BenhNhanDashboard from './pages/BenhNhan/BenhNhanDashboard';
import DatLichHen from './pages/BenhNhan/DatLichHen';
import LichHenCuaToi from './pages/BenhNhan/LichHenCuaToi';
import HoaDonCuaToi from './pages/BenhNhan/HoaDonCuaToi';
import HoSoCaNhan from './pages/BenhNhan/HoSoCaNhan';

// Styles
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<PrivateRoute component={AdminDashboard} allowedRoles={['Admin']} />}
          />
          <Route
            path="/admin/nguoi-dung"
            element={<PrivateRoute component={ManageNguoiDung} allowedRoles={['Admin']} />}
          />
          <Route
            path="/admin/benh-nhan"
            element={<PrivateRoute component={ManageBenhNhan} allowedRoles={['Admin']} />}
          />
          <Route
            path="/admin/bac-si"
            element={<PrivateRoute component={ManageBacSi} allowedRoles={['Admin']} />}
          />
          <Route
            path="/admin/chuyen-khoa"
            element={<PrivateRoute component={ManageChuyenKhoa} allowedRoles={['Admin']} />}
          />
          <Route
            path="/admin/lich-hen"
            element={<PrivateRoute component={ManageLichHen} allowedRoles={['Admin']} />}
          />
          <Route
            path="/admin/hoa-don"
            element={<PrivateRoute component={ManageHoaDon} allowedRoles={['Admin']} />}
          />

          {/* BacSi Routes */}
          <Route
            path="/bac-si"
            element={<PrivateRoute component={BacSiDashboard} allowedRoles={['BacSi']} />}
          />
          <Route
            path="/bac-si/lich-lam-viec"
            element={<PrivateRoute component={LichLamViec} allowedRoles={['BacSi']} />}
          />
          <Route
            path="/bac-si/benh-nhan-cua-toi"
            element={<PrivateRoute component={BenhNhanCuaToi} allowedRoles={['BacSi']} />}
          />
          <Route
            path="/bac-si/ho-so-kham-benh"
            element={<PrivateRoute component={QuanLyHoSoKhamBenh} allowedRoles={['BacSi']} />}
          />
          <Route
            path="/bac-si/don-thuoc"
            element={<PrivateRoute component={QuanLyDonThuoc} allowedRoles={['BacSi']} />}
          />

          {/* NhanVien Routes */}
          <Route
            path="/nhan-vien"
            element={<PrivateRoute component={NhanVienDashboard} allowedRoles={['NhanVien']} />}
          />
          <Route
            path="/nhan-vien/lich-hen"
            element={<PrivateRoute component={LichHenNhanVien} allowedRoles={['NhanVien']} />}
          />
          <Route
            path="/nhan-vien/benh-nhan"
            element={<PrivateRoute component={BenhNhanNhanVien} allowedRoles={['NhanVien']} />}
          />
          <Route
            path="/nhan-vien/danh-muc-thuoc"
            element={<PrivateRoute component={QuanLyDanhMucThuoc} allowedRoles={['NhanVien']} />}
          />
          <Route
            path="/nhan-vien/thuoc"
            element={<PrivateRoute component={QuanLyThuoc} allowedRoles={['NhanVien']} />}
          />
          <Route
            path="/nhan-vien/ton-kho"
            element={<PrivateRoute component={QuanLyTonKho} allowedRoles={['NhanVien']} />}
          />
          <Route
            path="/nhan-vien/phieu-nhap-thuoc"
            element={<PrivateRoute component={QuanLyPhieuNhapThuoc} allowedRoles={['NhanVien']} />}
          />

          {/* Patient Routes */}
          <Route
            path="/benh-nhan"
            element={<PrivateRoute component={BenhNhanDashboard} allowedRoles={['BenhNhan']} />}
          />
          <Route
            path="/benh-nhan/dat-lich"
            element={<PrivateRoute component={DatLichHen} allowedRoles={['BenhNhan']} />}
          />
          <Route
            path="/benh-nhan/lich-hen"
            element={<PrivateRoute component={LichHenCuaToi} allowedRoles={['BenhNhan']} />}
          />
          <Route
            path="/benh-nhan/hoa-don"
            element={<PrivateRoute component={HoaDonCuaToi} allowedRoles={['BenhNhan']} />}
          />
          <Route
            path="/benh-nhan/ho-so"
            element={<PrivateRoute component={HoSoCaNhan} allowedRoles={['BenhNhan']} />}
          />

          {/* Fallback Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
