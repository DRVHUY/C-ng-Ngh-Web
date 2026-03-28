import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { benhNhanService, lichHenService, hoaDonService } from '../../services/benhNhanService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Dashboard.css';

const AdminDashboard: React.FC = () => {
  const { role } = useAuth();
  const [stats, setStats] = useState({
    totalBenhNhan: 0,
    totalLichHen: 0,
    totalHoaDon: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [benhNhanRes, lichHenRes, hoaDonRes] = await Promise.all([
        benhNhanService.getAllBenhNhanList(),
        lichHenService.getAllLichHenList(),
        hoaDonService.getAllHoaDonList(),
      ]);

      setStats({
        totalBenhNhan: benhNhanRes.success ? benhNhanRes.data?.length || 0 : 0,
        totalLichHen: lichHenRes.success ? lichHenRes.data?.length || 0 : 0,
        totalHoaDon: hoaDonRes.success ? hoaDonRes.data?.length || 0 : 0,
      });
    } catch (error) {
      console.error('Lỗi tải dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardTitle = () => {
    switch (role) {
      case 'Admin':
        return 'Dashboard Quản Trị';
      case 'BacSi':
        return 'Dashboard Bác Sĩ';
      case 'NhanVien':
        return 'Dashboard Nhân Viên';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>{getDashboardTitle()}</h1>

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Bệnh Nhân</h3>
                  <p className="stat-number">{stats.totalBenhNhan}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>Lịch Hẹn</h3>
                  <p className="stat-number">{stats.totalLichHen}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💳</div>
                <div className="stat-info">
                  <h3>Hóa Đơn</h3>
                  <p className="stat-number">{stats.totalHoaDon}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
