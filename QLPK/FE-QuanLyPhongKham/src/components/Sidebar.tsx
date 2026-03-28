import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (role) {
      case 'Admin':
        return [
          { label: '📊 Dashboard', path: '/admin' },
          { label: '👤 Người Dùng', path: '/admin/nguoi-dung' },
          { label: '👨‍⚕️ Bác Sĩ', path: '/admin/bac-si' },
          { label: '👥 Bệnh Nhân', path: '/admin/benh-nhan' },
          { label: '🏥 Chuyên Khoa', path: '/admin/chuyen-khoa' },
          { label: '📅 Lịch Khám', path: '/admin/lich-hen' },
          { label: '💰 Hóa Đơn', path: '/admin/hoa-don' },
        ];
      case 'BacSi':
        return [
          { label: '📊 Dashboard', path: '/bac-si' },
          { label: '📅 Lịch Làm Việc', path: '/bac-si/lich-lam-viec' },
          { label: '👥 Bệnh Nhân Của Tôi', path: '/bac-si/benh-nhan-cua-toi' },
          { label: '📋 Hồ Sơ Khám Bệnh', path: '/bac-si/ho-so-kham-benh' },
          { label: '💊 Đơn Thuốc', path: '/bac-si/don-thuoc' },
        ];
      case 'NhanVien':
        return [
          { label: '📊 Dashboard', path: '/nhan-vien' },
          { label: '📅 Lịch Khám', path: '/nhan-vien/lich-hen' },
          { label: '👥 Bệnh Nhân', path: '/nhan-vien/benh-nhan' },
          { label: '📋 Danh Mục Thuốc', path: '/nhan-vien/danh-muc-thuoc' },
          { label: '💊 Quản Lý Thuốc', path: '/nhan-vien/thuoc' },
          { label: '📦 Tồn Kho', path: '/nhan-vien/ton-kho' },
          { label: '📄 Phiếu Nhập Thuốc', path: '/nhan-vien/phieu-nhap-thuoc' },
        ];
      case 'BenhNhan':
        return [
          { label: '🏠 Dashboard', path: '/benh-nhan' },
          { label: '📅 Đặt Lịch Khám', path: '/benh-nhan/dat-lich' },
          { label: '📋 Lịch Khám Của Tôi', path: '/benh-nhan/lich-hen' },
          { label: '💰 Hóa Đơn Của Tôi', path: '/benh-nhan/hoa-don' },
          { label: '👤 Hồ Sơ Cá Nhân', path: '/benh-nhan/ho-so' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
