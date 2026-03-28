import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../../../src/styles/Dashboard.css';

interface HoaDon {
  MaHoaDon: number;
  NgayTao: string;
  TongTien: number;
  TrangThai: string;
  MaLichHen: number;
}

const HoaDonCuaToi: React.FC = () => {
  const [invoices, setInvoices] = useState<HoaDon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // TODO: Call API to get patient's invoices
        setInvoices([]);
      } catch (err) {
        setError('Không thể tải hóa đơn');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content loading">Đang tải hóa đơn...</div>
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
          <h1>Hóa Đơn Của Tôi</h1>

          {error && <div className="error-alert">{error}</div>}

          {invoices.length === 0 ? (
            <div className="welcome-box">
              <p>Bạn chưa có hóa đơn nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Hóa Đơn</th>
                    <th>Ngày Tạo</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.MaHoaDon}>
                      <td>{invoice.MaHoaDon}</td>
                      <td>{invoice.NgayTao}</td>
                      <td>{invoice.TongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{invoice.TrangThai}</td>
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

export default HoaDonCuaToi;
