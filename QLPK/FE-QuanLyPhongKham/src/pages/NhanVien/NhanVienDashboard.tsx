import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../../../src/styles/Dashboard.css';
import { lichHenService, benhNhanService } from '../../services/benhNhanService';

const NhanVienDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lichHenRes, benhNhanRes] = await Promise.all([
          lichHenService.getAllLichHenList(),
          benhNhanService.getAllBenhNhanList(),
        ]);

        if (!lichHenRes.success || !benhNhanRes.success) {
          setError('Không thể tải dữ liệu từ server');
          return;
        }

        const todayStr = new Date().toISOString().slice(0, 10);
        const todayAppointments = lichHenRes.data?.filter((apt: any) => apt.ThoiGianHen?.startsWith(todayStr)).length || 0;

        setStats({
          totalAppointments: lichHenRes.data?.length || 0,
          todayAppointments,
          totalPatients: benhNhanRes.data?.length || 0,
        });
      } catch (err) {
        setError('Không thể tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content loading">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Bảng Điều Khiển Nhân Viên</h1>

          {error && <div className="error-alert">{error}</div>}

          <div className="welcome-box">
            <h2>Chào mừng nhân viên 👤</h2>
            <p>Quản lý lịch khám, bệnh nhân và hóa đơn</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-info">
                <h3>Tổng Lịch Khám</h3>
                <p className="stat-number">{stats.totalAppointments}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>Lịch Hôm Nay</h3>
                <p className="stat-number">{stats.todayAppointments}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Bệnh Nhân</h3>
                <p className="stat-number">{stats.totalPatients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhanVienDashboard;
