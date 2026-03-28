import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { benhNhanService } from '../../services/benhNhanService';
import { BenhNhanExt } from '../../types';
import '../../../src/styles/Dashboard.css';

const BenhNhanCuaToi: React.FC = () => {
  const [patients, setPatients] = useState<BenhNhanExt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await benhNhanService.getAllBenhNhanList();
        setPatients(response.data || []);
      } catch (err) {
        setError('Không thể tải danh sách bệnh nhân');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content loading">Đang tải bệnh nhân...</div>
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
          <h1>Bệnh Nhân Của Tôi</h1>

          {error && <div className="error-alert">{error}</div>}

          {patients.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có bệnh nhân nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Bệnh Nhân</th>
                    <th>Họ Tên</th>
                    <th>Ngày Sinh</th>
                    <th>Giới Tính</th>
                    <th>Điện Thoại</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.MaBenhNhan}>
                      <td>{patient.MaBenhNhan}</td>
                      <td>{patient.HoTen}</td>
                      <td>{patient.NgaySinh}</td>
                      <td>{patient.GioiTinh}</td>
                      <td>{patient.DienThoai}</td>
                      <td>
                        <button className="btn-edit">Xem</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BenhNhanCuaToi;
