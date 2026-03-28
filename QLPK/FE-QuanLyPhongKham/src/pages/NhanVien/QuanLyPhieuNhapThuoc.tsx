import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { phieuNhapThuocService, chiTietPhieuNhapService, thuocService } from '../../services/thuocService';
import { PhieuNhapThuoc, ChiTietPhieuNhap, Thuoc } from '../../types';
import '../../../src/styles/Dashboard.css';

const QuanLyPhieuNhapThuoc: React.FC = () => {
  const [phieuNhapList, setPhieuNhapList] = useState<PhieuNhapThuoc[]>([]);
  const [chiTietList, setChiTietList] = useState<ChiTietPhieuNhap[]>([]);
  const [thuocList, setThuocList] = useState<Thuoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPhieuNhap, setEditingPhieuNhap] = useState<PhieuNhapThuoc | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'NgayNhap',
      label: 'Ngày Nhập',
      type: 'date',
      required: true,
    },
    {
      name: 'NhaCungCap',
      label: 'Nhà Cung Cấp',
      type: 'text',
      required: true,
    },
    {
      name: 'TongTien',
      label: 'Tổng Tiền',
      type: 'number',
      required: true,
      validation: (value) => (Number(value) > 0 ? null : 'Tổng tiền phải > 0'),
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
      const [phieuNhapRes, chiTietRes, thuocRes] = await Promise.all([
        phieuNhapThuocService.getAllPhieuNhapThuocList(),
        chiTietPhieuNhapService.getAllChiTietPhieuNhapList(),
        thuocService.getAllThuocList(),
      ]);

      if (phieuNhapRes.success && phieuNhapRes.data) setPhieuNhapList(phieuNhapRes.data);
      if (chiTietRes.success && chiTietRes.data) setChiTietList(chiTietRes.data);
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
    setEditingPhieuNhap(undefined);
    setModalOpen(true);
  };

  const handleEdit = (phieuNhap: PhieuNhapThuoc) => {
    setEditingPhieuNhap(phieuNhap);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingPhieuNhap) {
        result = await phieuNhapThuocService.updatePhieuNhapThuoc(editingPhieuNhap.MaPhieuNhap, formData);
      } else {
        result = await phieuNhapThuocService.createPhieuNhapThuoc(formData);
      }

      if (result.success) {
        alert(editingPhieuNhap ? 'Cập nhật phiếu nhập thành công' : 'Tạo phiếu nhập thành công');
        loadData();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu phiếu nhập:', err);
      alert('Lỗi lưu phiếu nhập');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa phiếu nhập này?')) return;

    try {
      const result = await phieuNhapThuocService.deletePhieuNhapThuoc(id);
      if (result.success) {
        alert('Xóa phiếu nhập thành công');
        setPhieuNhapList((prev) => prev.filter((item) => item.MaPhieuNhap !== id));
      } else {
        alert(result.message || 'Xóa phiếu nhập thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa phiếu nhập:', err);
      alert('Lỗi xóa phiếu nhập');
    }
  };

  const getChiTietPhieuNhap = (maPhieuNhap: number) => {
    return chiTietList.filter(ct => ct.MaPhieuNhap === maPhieuNhap);
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
          <h1>Quản Lý Phiếu Nhập Thuốc</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Phiếu Nhập
          </button>

          {error && <div className="error-alert">{error}</div>}

          {phieuNhapList.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có phiếu nhập thuốc nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Phiếu</th>
                    <th>Ngày Nhập</th>
                    <th>Nhà Cung Cấp</th>
                    <th>Tổng Tiền</th>
                    <th>Số Loại Thuốc</th>
                    <th>Thuốc Đầu</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {phieuNhapList.map((phieuNhap) => {
                    const chiTietList = getChiTietPhieuNhap(phieuNhap.MaPhieuNhap);
                    return (
                      <tr key={phieuNhap.MaPhieuNhap}>
                        <td>{phieuNhap.MaPhieuNhap}</td>
                        <td>{new Date(phieuNhap.NgayNhap).toLocaleDateString('vi-VN')}</td>
                        <td>{phieuNhap.NhaCungCap}</td>
                        <td>{phieuNhap.TongTien.toLocaleString('vi-VN')} VND</td>
                        <td>{chiTietList.length} loại</td>
                        <td>{chiTietList.length > 0 ? getThuocInfo(chiTietList[0].MaThuoc)?.TenThuoc || 'N/A' : 'N/A'}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(phieuNhap)}>Sửa</button>
                          <button className="btn-delete" onClick={() => handleDelete(phieuNhap.MaPhieuNhap)}>Xóa</button>
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
            title={editingPhieuNhap ? "Cập Nhật Phiếu Nhập Thuốc" : "Thêm Phiếu Nhập Thuốc"}
            fields={getFormFields()}
            initialData={editingPhieuNhap}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuanLyPhieuNhapThuoc;