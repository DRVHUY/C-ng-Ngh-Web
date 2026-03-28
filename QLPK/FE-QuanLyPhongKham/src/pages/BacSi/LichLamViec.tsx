import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../../../src/styles/Dashboard.css';
import { lichHenService } from '../../services/benhNhanService';
import { LichHen } from '../../types';

const LichLamViec: React.FC = () => {
  const [schedule, setSchedule] = useState<LichHen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      setLoading(true);
      const response = await lichHenService.getAllLichHenList();
      if (response.success && response.data) {
        setSchedule(response.data);
        setError('');
      } else {
        setError(response.message || 'Không thể tải lịch làm việc');
      }
    } catch (err) {
      setError('Lỗi khi tải lịch làm việc');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
          <h1>Lịch Làm Việc</h1>

          {error && <div className="error-alert">{error}</div>}

          {schedule.length === 0 ? (
            <div className="welcome-box">
              <p>Không có lịch khám nào</p>
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
                  {schedule.map((item) => {
                    const dateTime = item.ThoiGianHen ? new Date(item.ThoiGianHen) : null;
                    return (
                      <tr key={item.MaLichHen}>
                        <td>{item.MaLichHen}</td>
                        <td>{dateTime ? dateTime.toLocaleDateString('vi-VN') : 'N/A'}</td>
                        <td>{dateTime ? dateTime.toLocaleTimeString('vi-VN') : 'N/A'}</td>
                        <td>{item.LyDo || '---'}</td>
                        <td>{item.TrangThai}</td>
                        <td>
                          <button className="btn-edit">Cập Nhật</button>
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

export default LichLamViec;
