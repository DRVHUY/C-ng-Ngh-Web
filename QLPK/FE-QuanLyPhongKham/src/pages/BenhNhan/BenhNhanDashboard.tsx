import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { lichHenService, hoaDonService, benhNhanService } from '../../services/benhNhanService';
import { LichHen, HoaDon } from '../../types';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Dashboard.css';

const BenhNhanDashboard: React.FC = () => {
  const { user } = useAuth();
  const [lichHenList, setLichHenList] = React.useState<LichHen[]>([]);
  const [hoaDonList, setHoaDonList] = React.useState<HoaDon[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    loadBenhNhanData();
  }, [user]);

  const loadBenhNhanData = async () => {
    try {
      setLoading(true);
      if (!user) {
        setError('Không tìm thấy thông tin người dùng.');
        return;
      }

      const benhNhanRes = await benhNhanService.getAllBenhNhanList();
      if (!benhNhanRes.success) {
        setError('Không thể lấy thông tin bệnh nhân.');
        return;
      }

      const patientInfo = benhNhanRes.data?.find((bn: any) => bn.MaNguoiDung === user.MaNguoiDung);
      if (!patientInfo) {
        setError('Chưa có hồ sơ bệnh nhân cho tài khoản này.');
        return;
      }

      const [lichHenRes, hoaDonRes] = await Promise.all([
        lichHenService.getLichHenByBenhNhan(patientInfo.MaBenhNhan),
        hoaDonService.getAllHoaDonList(),
      ]);

      if (!lichHenRes.success || !hoaDonRes.success) {
        setError('Không thể tải dữ liệu lịch hẹn/hóa đơn.');
        return;
      }

      setLichHenList(lichHenRes.data || []);
      const patientAppointmentIds = new Set(lichHenRes.data?.map((item: any) => item.MaLichHen));
      setHoaDonList((hoaDonRes.data || []).filter((hd: any) => patientAppointmentIds.has(hd.MaLichHen)));
    } catch (err) {
      setError('Lỗi tải dữ liệu: ' + (err instanceof Error ? err.message : 'Không xác định'));
      console.error('Lỗi tải dữ liệu:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Trang Bệnh Nhân</h1>

          <div className="welcome-box">
            <h2>Xin chào, {user?.HoTen}!</h2>
            <p>Đây là trang quản lý thông tin cá nhân và lịch hẹn của bạn</p>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>Tổng lịch hẹn</h3>
                <p className="stat-number">{lichHenList.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💳</div>
              <div className="stat-info">
                <h3>Tổng hóa đơn</h3>
                <p className="stat-number">{hoaDonList.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Tổng bệnh nhân</h3>
                <p className="stat-number">{lichHenList.length > 0 ? new Set(lichHenList.map((l) => l.MaBenhNhan)).size : 0}</p>
              </div>
            </div>
          </div>

          <div className="table-container" style={{ marginTop: '20px' }}>
            <h3>Danh sách lịch hẹn</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mã Lịch</th>
                  <th>Bác Sĩ</th>
                  <th>Ngày giờ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {lichHenList.map((item) => (
                  <tr key={item.MaLichHen}>
                    <td>{item.MaLichHen}</td>
                    <td>{item.MaBacSi}</td>
                    <td>{item.ThoiGianHen}</td>
                    <td>{item.TrangThai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenhNhanDashboard;
