import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { hoSoKhamBenhService, donThuocService } from '../../services/hoSoService';
import { lichHenService } from '../../services/benhNhanService';
import { HoSoKhamBenh, DonThuoc, LichHen } from '../../types';
import '../../../src/styles/Dashboard.css';

const QuanLyHoSoKhamBenh: React.FC = () => {
  const [hoSoList, setHoSoList] = useState<HoSoKhamBenh[]>([]);
  const [lichHenList, setLichHenList] = useState<LichHen[]>([]);
  const [donThuocList, setDonThuocList] = useState<DonThuoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHoSo, setEditingHoSo] = useState<HoSoKhamBenh | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'MaLichHen',
      label: 'Lịch Hẹn',
      type: 'select',
      required: true,
      options: lichHenList.map((lichHen) => ({
        value: lichHen.MaLichHen.toString(),
        label: `${lichHen.MaLichHen} - BN: ${lichHen.MaBenhNhan}, BS: ${lichHen.MaBacSi}`,
      })),
    },
    {
      name: 'TrieuChung',
      label: 'Triệu Chứng',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ChanDoan',
      label: 'Chẩn Đoán',
      type: 'textarea',
      required: true,
    },
    {
      name: 'GhiChu',
      label: 'Ghi Chú',
      type: 'textarea',
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [hoSoRes, lichHenRes, donThuocRes] = await Promise.all([
        hoSoKhamBenhService.getAllHoSoKhamBenhList(),
        lichHenService.getAllLichHenList(),
        donThuocService.getAllDonThuocList(),
      ]);

      if (hoSoRes.success && hoSoRes.data) setHoSoList(hoSoRes.data);
      if (lichHenRes.success && lichHenRes.data) setLichHenList(lichHenRes.data);
      if (donThuocRes.success && donThuocRes.data) setDonThuocList(donThuocRes.data);

      setError('');
    } catch (err) {
      setError('Không thể tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingHoSo(undefined);
    setModalOpen(true);
  };

  const handleEdit = (hoSo: HoSoKhamBenh) => {
    setEditingHoSo(hoSo);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingHoSo) {
        result = await hoSoKhamBenhService.updateHoSoKhamBenh(editingHoSo.MaHoSoKham, formData);
      } else {
        result = await hoSoKhamBenhService.createHoSoKhamBenh(formData);
      }

      if (result.success) {
        alert(editingHoSo ? 'Cập nhật hồ sơ thành công' : 'Tạo hồ sơ thành công');
        loadData();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu hồ sơ:', err);
      alert('Lỗi lưu hồ sơ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa hồ sơ này?')) return;

    try {
      const result = await hoSoKhamBenhService.deleteHoSoKhamBenh(id);
      if (result.success) {
        alert('Xóa hồ sơ thành công');
        setHoSoList((prev) => prev.filter((item) => item.MaHoSoKham !== id));
      } else {
        alert(result.message || 'Xóa hồ sơ thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa hồ sơ:', err);
      alert('Lỗi xóa hồ sơ');
    }
  };

  const getLichHenInfo = (maLichHen: number) => {
    return lichHenList.find(lh => lh.MaLichHen === maLichHen);
  };

  const getDonThuocInfo = (maHoSoKham: number) => {
    return donThuocList.filter(dt => dt.MaHoSoKham === maHoSoKham);
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
          <h1>Quản Lý Hồ Sơ Khám Bệnh</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Hồ Sơ Khám Bệnh
          </button>

          {error && <div className="error-alert">{error}</div>}

          {hoSoList.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có hồ sơ khám bệnh nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Hồ Sơ</th>
                    <th>Lịch Hẹn</th>
                    <th>Triệu Chứng</th>
                    <th>Chẩn Đoán</th>
                    <th>Ngày Khám</th>
                    <th>Đơn Thuốc</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {hoSoList.map((hoSo) => {
                    const lichHen = getLichHenInfo(hoSo.MaLichHen);
                    const donThuocs = getDonThuocInfo(hoSo.MaHoSoKham);
                    return (
                      <tr key={hoSo.MaHoSoKham}>
                        <td>{hoSo.MaHoSoKham}</td>
                        <td>{lichHen ? `LH${lichHen.MaLichHen}` : 'N/A'}</td>
                        <td>{hoSo.TrieuChung.substring(0, 50)}...</td>
                        <td>{hoSo.ChanDoan.substring(0, 50)}...</td>
                        <td>{new Date(hoSo.NgayKham).toLocaleDateString('vi-VN')}</td>
                        <td>{donThuocs.length} đơn</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(hoSo)}>Sửa</button>
                          <button className="btn-delete" onClick={() => handleDelete(hoSo.MaHoSoKham)}>Xóa</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <FormModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            title={editingHoSo ? "Cập Nhật Hồ Sơ Khám Bệnh" : "Thêm Hồ Sơ Khám Bệnh"}
            fields={getFormFields()}
            initialData={editingHoSo}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuanLyHoSoKhamBenh;