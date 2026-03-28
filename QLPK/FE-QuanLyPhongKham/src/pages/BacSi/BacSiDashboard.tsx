import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { bacSiService } from '../../services/bacSiService';
import { lichHenService, benhNhanService, hoaDonService } from '../../services/benhNhanService';
import { BacSi, LichHen } from '../../types';
import '../../../src/styles/Dashboard.css';

const BacSiDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    totalInvoices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          setError('Không tìm thấy thông tin người dùng.');
          return;
        }

        const [bacSiRes, lichHenRes, hoaDonRes, benhNhanRes] = await Promise.all([
          bacSiService.getAllBacSiList(),
          lichHenService.getAllLichHenList(),
          hoaDonService.getAllHoaDonList(),
          benhNhanService.getAllBenhNhanList(),
        ]);

        if (!bacSiRes.success || !lichHenRes.success || !hoaDonRes.success || !benhNhanRes.success) {
          setError('Không thể tải dữ liệu từ server');
          return;
        }

        const bacSi = bacSiRes.data?.find((item: BacSi) => item.MaNguoiDung === user.MaNguoiDung);
        if (!bacSi) {
          setError('Không tìm thấy hồ sơ bác sĩ. Kiểm tra quyền và dữ liệu.');
          return;
        }

        const myAppointments = lichHenRes.data?.filter((apt: LichHen) => apt.MaBacSi === bacSi.MaBacSi) || [];

        const todayStr = new Date().toISOString().slice(0, 10);
        const todayAppointments = myAppointments.filter((apt: LichHen) => apt.ThoiGianHen?.startsWith(todayStr)).length;

        const myPatientIds = new Set(myAppointments.map((apt: LichHen) => apt.MaBenhNhan));
        const patients = benhNhanRes.data?.filter((bn: any) => myPatientIds.has(bn.MaBenhNhan)) || [];

        const myInvoiceIds = new Set(myAppointments.map((apt: LichHen) => apt.MaLichHen));
        const invoices = hoaDonRes.data?.filter((hd: any) => myInvoiceIds.has(hd.MaLichHen)) || [];

        setStats({
          totalPatients: patients.length,
          todayAppointments,
          totalInvoices: invoices.length,
        });
      } catch (err) {
        setError('Không thể tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
          <h1>Bảng Điều Khiển Bác Sĩ</h1>

          {error && <div className="error-alert">{error}</div>}

          <div className="welcome-box">
            <h2>Chào mừng bác sĩ 👨‍⚕️</h2>
            <p>Quản lý lịch khám, bệnh nhân và đơn thuốc của bạn</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Bệnh nhân</h3>
                <p className="stat-number">{stats.totalPatients}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>Lịch khám hôm nay</h3>
                <p className="stat-number">{stats.todayAppointments}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>Hóa đơn</h3>
                <p className="stat-number">{stats.totalInvoices}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacSiDashboard;
