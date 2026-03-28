import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import '../../../src/styles/Dashboard.css';
import { HoaDon, LichHen } from '../../types';
import { hoaDonService, lichHenService } from '../../services/benhNhanService';

const ManageHoaDon: React.FC = () => {
  const [invoices, setInvoices] = useState<HoaDon[]>([]);
  const [lichHenList, setLichHenList] = useState<LichHen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<HoaDon | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'MaLichHen',
      label: 'Lịch Hẹn',
      type: 'select',
      required: true,
      options: lichHenList.map((lh: LichHen) => ({
        value: lh.MaLichHen,
        label: `${lh.MaLichHen} - BN: ${lh.MaBenhNhan}, BS: ${lh.MaBacSi}`,
      })),
    },
    {
      name: 'TongTien',
      label: 'Tổng Tiền',
      type: 'number',
      required: true,
      validation: (value) => (Number(value) >= 0 ? null : 'Phải >= 0'),
    },
    {
      name: 'TrangThai',
      label: 'Trạng Thái',
      type: 'text',
      required: true,
      placeholder: 'Ví dụ: Chưa thanh toán, Đã thanh toán',
    },
  ];

  useEffect(() => {
    loadLichHen();
    loadInvoices();
  }, []);

  const loadLichHen = async () => {
    try {
      const result = await lichHenService.getAllLichHenList();
      if (result.success && result.data) {
        setLichHenList(result.data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách lịch hẹn:', err);
    }
  };

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const response = await hoaDonService.getAllHoaDonList();
      if (response.success && response.data) {
        setInvoices(response.data);
        setError('');
      } else {
        setError(response.message || 'Không thể tải hóa đơn');
      }
    } catch (err) {
      setError('Không thể tải hóa đơn');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingInvoice(undefined);
    setModalOpen(true);
  };

  const handleEdit = (invoice: HoaDon) => {
    setEditingInvoice(invoice);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      const dataToSave = {
        MaLichHen: Number(formData.MaLichHen),
        TongTien: Number(formData.TongTien),
        TrangThai: formData.TrangThai,
        NgayThanhToan: formData.NgayThanhToan || new Date().toISOString(),
      };

      let result;
      if (editingInvoice) {
        result = await hoaDonService.updateHoaDon(editingInvoice.MaHoaDon, dataToSave);
      } else {
        result = await hoaDonService.createHoaDon(dataToSave);
      }

      if (result.success) {
        alert(editingInvoice ? 'Cập nhật hóa đơn thành công' : 'Thêm hóa đơn thành công');
        loadInvoices();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu hóa đơn:', err);
      alert('Lỗi lưu hóa đơn');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa hóa đơn này?')) return;

    try {
      const result = await hoaDonService.deleteHoaDon(id);
      if (result.success) {
        alert('Xóa hóa đơn thành công');
        setInvoices((prev) => prev.filter((item) => item.MaHoaDon !== id));
      } else {
        alert(result.message || 'Xóa hóa đơn thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa hóa đơn:', err);
      alert('Lỗi xóa hóa đơn');
    }
  };

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
          <h1>Quản Lý Hóa Đơn</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Hóa Đơn
          </button>

          {error && <div className="error-alert">{error}</div>}

          {invoices.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có hóa đơn nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Hóa Đơn</th>
                    <th>Lịch Khám</th>
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
                      <td>{invoice.MaLichHen}</td>
                      <td>{invoice.NgayThanhToan ? new Date(invoice.NgayThanhToan).toLocaleDateString('vi-VN') : 'Chưa thanh toán'}</td>
                      <td>{invoice.TongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{invoice.TrangThai}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(invoice)}>
                          Sửa
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(invoice.MaHoaDon)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <FormModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            title={editingInvoice ? 'Sửa Hóa Đơn' : 'Thêm Hóa Đơn'}
            fields={getFormFields()}
            initialData={editingInvoice}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageHoaDon;
