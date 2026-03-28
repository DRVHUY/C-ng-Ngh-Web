import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css';

const Login: React.FC = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(tenDangNhap, matKhau);
      // Chuyển hướng dựa vào vai trò
      const role = localStorage.getItem('role');
      
      switch (role) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'BacSi':
          navigate('/bac-si');
          break;
        case 'NhanVien':
          navigate('/nhan-vien');
          break;
        case 'BenhNhan':
        default:
          navigate('/benh-nhan');
          break;
      }
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏥 Quản Lý Phòng Khám</h1>
          <p>Hệ thống quản lý phòng khám</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="tenDangNhap">Tên Đăng Nhập</label>
            <input
              type="text"
              id="tenDangNhap"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="matKhau">Mật Khẩu</label>
            <input
              type="password"
              id="matKhau"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              placeholder="Nhập mật khẩu"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;
