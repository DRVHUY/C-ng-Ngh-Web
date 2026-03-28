import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../../../src/styles/Dashboard.css';
import { lichHenService } from '../../services/benhNhanService';
import { LichHen } from '../../types';

const LichHenCuaToi: React.FC = () => {
  const [appointments, setAppointments] = useState<LichHen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const result = await lichHenService.getAllLichHenList();
      if (result.success && result.data) {
        setAppointments(result.data);
        setError('');
      } else {
        setError(result.message || 'Không thể tải lịch khám');
      }
    } catch (err) {
      setError('Lỗi khi tải lịch khám');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // TODO: Call API to get patient's appointments
        setAppointments([]);
      } catch (err) {
        setError('Không thể tải lịch khám');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content loading">Đang tải lịch khám...</div>
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
          <h1>Lịch Khám Của Tôi</h1>

          {error && <div className="error-alert">{error}</div>}

          {appointments.length === 0 ? (
            <div className="welcome-box">
              <p>Bạn chưa có lịch khám nào. <a href="/benh-nhan/dat-lich">Đặt lịch ngay</a></p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Lịch</th>
                    <th>Ngày Khám</th>
                    <th>Giờ Khám</th>
                    <th>Lý Do</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => {
                    const dateTime = apt.ThoiGianHen ? new Date(apt.ThoiGianHen) : null;
                    return (
                      <tr key={apt.MaLichHen}>
                        <td>{apt.MaLichHen}</td>
                        <td>{dateTime ? dateTime.toLocaleDateString('vi-VN') : 'N/A'}</td>
                        <td>{dateTime ? dateTime.toLocaleTimeString('vi-VN') : 'N/A'}</td>
                        <td>{apt.LyDo || '---'}</td>
                        <td>{apt.TrangThai}</td>
                        <td>
                          <button className="btn-edit">Xem Chi Tiết</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LichHenCuaToi;
