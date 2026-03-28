import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { donThuocService, chiTietDonThuocService, hoSoKhamBenhService } from '../../services/hoSoService';
import { thuocService } from '../../services/thuocService';
import { DonThuoc, ChiTietDonThuoc, Thuoc, HoSoKhamBenh } from '../../types';
import '../../../src/styles/Dashboard.css';

const QuanLyDonThuoc: React.FC = () => {
  const [donThuocList, setDonThuocList] = useState<DonThuoc[]>([]);
  const [chiTietList, setChiTietList] = useState<ChiTietDonThuoc[]>([]);
  const [hoSoList, setHoSoList] = useState<HoSoKhamBenh[]>([]);
  const [thuocList, setThuocList] = useState<Thuoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDonThuoc, setEditingDonThuoc] = useState<DonThuoc | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'MaHoSoKham',
      label: 'Hồ Sơ Khám Bệnh',
      type: 'select',
      required: true,
      options: hoSoList.map((hoSo) => ({
        value: hoSo.MaHoSoKham.toString(),
        label: `HS${hoSo.MaHoSoKham} - ${hoSo.TrieuChung.substring(0, 30)}...`,
      })),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [donThuocRes, chiTietRes, hoSoRes, thuocRes] = await Promise.all([
        donThuocService.getAllDonThuocList(),
        chiTietDonThuocService.getAllChiTietDonThuocList(),
        hoSoKhamBenhService.getAllHoSoKhamBenhList(),
        thuocService.getAllThuocList(),
      ]);

      if (donThuocRes.success && donThuocRes.data) setDonThuocList(donThuocRes.data);
      if (chiTietRes.success && chiTietRes.data) setChiTietList(chiTietRes.data);
      if (hoSoRes.success && hoSoRes.data) setHoSoList(hoSoRes.data);
      if (thuocRes.success && thuocRes.data) setThuocList(thuocRes.data);

      setError('');
    } catch (err) {
      setError('Không thể tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDonThuoc(undefined);
    setModalOpen(true);
  };

  const handleEdit = (donThuoc: DonThuoc) => {
    setEditingDonThuoc(donThuoc);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingDonThuoc) {
        result = await donThuocService.updateDonThuoc(editingDonThuoc.MaDonThuoc, formData);
      } else {
        result = await donThuocService.createDonThuoc(formData);
      }

      if (result.success) {
        alert(editingDonThuoc ? 'Cập nhật đơn thuốc thành công' : 'Tạo đơn thuốc thành công');
        loadData();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu đơn thuốc:', err);
      alert('Lỗi lưu đơn thuốc');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa đơn thuốc này?')) return;

    try {
      const result = await donThuocService.deleteDonThuoc(id);
      if (result.success) {
        alert('Xóa đơn thuốc thành công');
        setDonThuocList((prev) => prev.filter((item) => item.MaDonThuoc !== id));
      } else {
        alert(result.message || 'Xóa đơn thuốc thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa đơn thuốc:', err);
      alert('Lỗi xóa đơn thuốc');
    }
  };

  const getHoSoInfo = (maHoSoKham: number) => {
    return hoSoList.find(hs => hs.MaHoSoKham === maHoSoKham);
  };

  const getChiTietDonThuoc = (maDonThuoc: number) => {
    return chiTietList.filter(ct => ct.MaDonThuoc === maDonThuoc);
  };

  const getThuocInfo = (maThuoc: number) => {
    return thuocList.find(t => t.MaThuoc === maThuoc);
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
          <h1>Quản Lý Đơn Thuốc</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Đơn Thuốc
          </button>

          {error && <div className="error-alert">{error}</div>}

          {donThuocList.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có đơn thuốc nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Hồ Sơ Khám</th>
                    <th>Ngày Kê</th>
                    <th>Số Thuốc</th>
                    <th>Thuốc Đầu</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {donThuocList.map((donThuoc) => {
                    const hoSo = getHoSoInfo(donThuoc.MaHoSoKham);
                    const chiTietList = getChiTietDonThuoc(donThuoc.MaDonThuoc);
                    return (
                      <tr key={donThuoc.MaDonThuoc}>
                        <td>{donThuoc.MaDonThuoc}</td>
                        <td>{hoSo ? `HS${hoSo.MaHoSoKham}` : 'N/A'}</td>
                        <td>{new Date(donThuoc.NgayKe).toLocaleDateString('vi-VN')}</td>
                        <td>{chiTietList.length} loại</td>
                        <td>{chiTietList.length > 0 ? getThuocInfo(chiTietList[0].MaThuoc)?.TenThuoc ?? 'N/A' : 'N/A'}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(donThuoc)}>Sửa</button>
                          <button className="btn-delete" onClick={() => handleDelete(donThuoc.MaDonThuoc)}>Xóa</button>
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
            title={editingDonThuoc ? "Cập Nhật Đơn Thuốc" : "Thêm Đơn Thuốc"}
            fields={getFormFields()}
            initialData={editingDonThuoc}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuanLyDonThuoc;