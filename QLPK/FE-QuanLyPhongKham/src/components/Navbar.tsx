import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (role) {
      case 'Admin':
      case 'BacSi':
      case 'NhanVien':
        return '/admin';
      case 'BenhNhan':
        return '/benh-nhan';
      default:
        return '/';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href={getDashboardLink()}>
            <span className="app-logo">🏥</span>
            <span className="app-name">Quản Lý Phòng Khám</span>
          </a>
        </div>

        <div className="navbar-center">
          <span className="role-badge">{role}</span>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">{user?.HoTen || 'Người dùng'}</span>
            <span className="user-email">{user?.Email}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
