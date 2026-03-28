import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, NguoiDung, UserRole } from '../types';
import { authService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<NguoiDung | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Tải thông tin từ localStorage khi component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setRole((savedRole as UserRole) || null);
    }
    setLoading(false);
  }, []);

  const login = async (tenDangNhap: string, matKhau: string) => {
    try {
      setLoading(true);
      const response = await authService.login(tenDangNhap, matKhau);

      if (response.success && response.data) {
        // Lấy token và user info từ response mới
        const { token, user } = response.data;

        if (!token || !user) {
          throw new Error('Dữ liệu đăng nhập không hợp lệ');
        }

        // Lưu token & user info
        setToken(token);
        setUser(user);

        // Lấy vai trò từ user info
        const userRole = (user.VaiTro as UserRole) || 'BenhNhan';
        setRole(userRole);

        // Lưu vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', userRole);
      } else {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  // Helper function để xác định vai trò (không còn sử dụng - lấy từ API)
  // const determineRole = (email: string): UserRole => {
  //   if (email.includes('admin')) return 'Admin';
  //   if (email.includes('doctor') || email.includes('bac-si')) return 'BacSi';
  //   if (email.includes('staff') || email.includes('nhan-vien')) return 'NhanVien';
  //   return 'BenhNhan';
  // };

  const value: AuthContextType = {
    user,
    token,
    role,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook để sử dụng auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};

// Export AuthContext để sử dụng trực tiếp nếu cần
export { AuthContext };
