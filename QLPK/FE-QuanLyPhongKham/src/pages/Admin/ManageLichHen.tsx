import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import '../../../src/styles/Dashboard.css';
import { lichHenService } from '../../services/benhNhanService';
import { benhNhanService } from '../../services/benhNhanService';
import { bacSiService } from '../../services/bacSiService';
import { BenhNhan, BacSi } from '../../types';

interface LichHen {
  MaLichHen: number;
  MaBacSi: number;
  MaBenhNhan: number;
  MaLich: number;
  ThoiGianHen: string;
  TrangThai: string;
  NgayDat?: string;
}

const ManageLichHen: React.FC = () => {
  const [appointments, setAppointments] = useState<LichHen[]>([]);
  const [benhNhanList, setBenhNhanList] = useState<BenhNhan[]>([]);
  const [bacSiList, setBacSiList] = useState<BacSi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<LichHen | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => editingAppointment
    ? [
        {
          name: 'TrangThai',
          label: 'Trạng Thái',
          type: 'select',
          required: true,
          options: [
            { value: 'Chờ xác nhận', label: 'Chờ xác nhận' },
            { value: 'Đã xác nhận', label: 'Đã xác nhận' },
            { value: 'Hoàn thành', label: 'Hoàn thành' },
            { value: 'Hủy', label: 'Hủy' },
          ],
        },
      ]
    : [
        {
          name: 'MaBenhNhan',
          label: 'Bệnh Nhân',
          type: 'select',
          required: true,
          options: benhNhanList.map((bn: BenhNhan) => ({
            value: bn.MaBenhNhan,
            label: `${bn.MaBenhNhan} - Mã NG: ${bn.MaNguoiDung}`,
          })),
        },
        {
          name: 'MaBacSi',
          label: 'Bác Sĩ',
          type: 'select',
          required: true,
          options: bacSiList.map((bs: BacSi) => ({
            value: bs.MaBacSi,
            label: `${bs.MaBacSi} - Mã NG: ${bs.MaNguoiDung}`,
          })),
        },
        {
          name: 'MaLich',
          label: 'Mã Lịch',
          type: 'number',
          required: true,
          validation: (value) => (Number(value) > 0 ? null : 'Phải > 0'),
        },
        {
          name: 'ThoiGianHen',
          label: 'Thời Gian Hẹn',
          type: 'date',
          required: true,
        },
      ];

  useEffect(() => {
    loadBenhNhan();
    loadBacSi();
    loadAppointments();
  }, []);

  const loadBenhNhan = async () => {
    try {
      const result = await benhNhanService.getAllBenhNhanList();
      if (result.success && result.data) {
        setBenhNhanList(result.data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách bệnh nhân:', err);
    }
  };

  const loadBacSi = async () => {
    try {
      const result = await bacSiService.getAllBacSiList();
      if (result.success && result.data) {
        setBacSiList(result.data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách bác sĩ:', err);
    }
  };

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await lichHenService.getAllLichHenList();
      if (response.success && response.data) {
        setAppointments(response.data);
        setError('');
      } else {
        setError(response.message || 'Không thể tải lịch khám');
      }
    } catch (err) {
      setError('Không thể tải lịch khám');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingAppointment(undefined);
    setModalOpen(true);
  };

  const handleEdit = (appointment: LichHen) => {
    setEditingAppointment(appointment);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingAppointment) {
        // Chỉ cập nhật trạng thái
        result = await lichHenService.updateLichHenStatus(editingAppointment.MaLichHen, formData.TrangThai);
      } else {
        // Tạo lịch hẹn mới
        result = await lichHenService.bookAppointment({
          MaBenhNhan: formData.MaBenhNhan,
          MaBacSi: formData.MaBacSi,
          MaLich: formData.MaLich,
          ThoiGianHen: formData.ThoiGianHen,
        });
      }

      if (result.success) {
        alert(editingAppointment ? 'Cập nhật trạng thái thành công' : 'Tạo lịch hẹn thành công');
        loadAppointments();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu lịch hẹn:', err);
      alert('Lỗi lưu lịch hẹn');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa lịch hẹn này?')) return;

    try {
      const result = await lichHenService.deleteLichHen(id);
      if (result.success) {
        alert('Xóa lịch hẹn thành công');
        setAppointments((prev) => prev.filter((item) => item.MaLichHen !== id));
      } else {
        alert(result.message || 'Xóa lịch hẹn thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa lịch hẹn:', err);
      alert('Lỗi xóa lịch hẹn');
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
          <h1>Quản Lý Lịch Khám</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Lịch Khám
          </button>

          {error && <div className="error-alert">{error}</div>}

          {appointments.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có lịch khám nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Lịch</th>
                    <th>Bác Sĩ</th>
                    <th>Bệnh Nhân</th>
                    <th>Ngày Khám</th>
                    <th>Giờ Khám</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.MaLichHen}>
                      <td>{apt.MaLichHen}</td>
                      <td>{apt.MaBacSi}</td>
                      <td>{apt.MaBenhNhan}</td>
                      <td>{new Date(apt.ThoiGianHen).toLocaleDateString('vi-VN')}</td>
                      <td>{new Date(apt.ThoiGianHen).toLocaleTimeString('vi-VN')}</td>
                      <td>{apt.TrangThai}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(apt)}>
                          Cập nhật trạng thái
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(apt.MaLichHen)}
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
            title={editingAppointment ? 'Cập nhật Trạng Thái' : 'Thêm Lịch Khám'}
            fields={getFormFields()}
            initialData={
              editingAppointment
                ? { TrangThai: editingAppointment.TrangThai }
                : undefined
            }
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageLichHen;
