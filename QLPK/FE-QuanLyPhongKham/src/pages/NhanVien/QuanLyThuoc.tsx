import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { thuocService, danhMucThuocService } from '../../services/thuocService';
import { Thuoc, DanhMucThuoc } from '../../types';
import '../../../src/styles/Dashboard.css';

const QuanLyThuoc: React.FC = () => {
  const [thuocList, setThuocList] = useState<Thuoc[]>([]);
  const [danhMucList, setDanhMucList] = useState<DanhMucThuoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingThuoc, setEditingThuoc] = useState<Thuoc | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'TenThuoc',
      label: 'Tên Thuốc',
      type: 'text',
      required: true,
    },
    {
      name: 'DonViTinh',
      label: 'Đơn Vị Tính',
      type: 'text',
      required: true,
    },
    {
      name: 'Gia',
      label: 'Giá',
      type: 'number',
      required: true,
      validation: (value) => (Number(value) > 0 ? null : 'Giá phải > 0'),
    },
    {
      name: 'MaDanhMuc',
      label: 'Danh Mục',
      type: 'select',
      required: true,
      options: danhMucList.map((dm) => ({
        value: dm.MaDanhMuc.toString(),
        label: dm.TenDanhMuc,
      })),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [thuocRes, danhMucRes] = await Promise.all([
        thuocService.getAllThuocList(),
        danhMucThuocService.getAllDanhMucThuocList(),
      ]);

      if (thuocRes.success && thuocRes.data) setThuocList(thuocRes.data);
      if (danhMucRes.success && danhMucRes.data) setDanhMucList(danhMucRes.data);

      setError('');
    } catch (err) {
      setError('Không thể tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingThuoc(undefined);
    setModalOpen(true);
  };

  const handleEdit = (thuoc: Thuoc) => {
    setEditingThuoc(thuoc);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingThuoc) {
        result = await thuocService.updateThuoc(editingThuoc.MaThuoc, formData);
      } else {
        result = await thuocService.createThuoc(formData);
      }

      if (result.success) {
        alert(editingThuoc ? 'Cập nhật thuốc thành công' : 'Tạo thuốc thành công');
        loadData();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu thuốc:', err);
      alert('Lỗi lưu thuốc');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa thuốc này?')) return;

    try {
      const result = await thuocService.deleteThuoc(id);
      if (result.success) {
        alert('Xóa thuốc thành công');
        setThuocList((prev) => prev.filter((item) => item.MaThuoc !== id));
      } else {
        alert(result.message || 'Xóa thuốc thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa thuốc:', err);
      alert('Lỗi xóa thuốc');
    }
  };

  const getDanhMucInfo = (maDanhMuc: number) => {
    return danhMucList.find(dm => dm.MaDanhMuc === maDanhMuc);
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
          <h1>Quản Lý Thuốc</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Thuốc
          </button>

          {error && <div className="error-alert">{error}</div>}

          {thuocList.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có thuốc nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Thuốc</th>
                    <th>Tên Thuốc</th>
                    <th>Đơn Vị Tính</th>
                    <th>Giá</th>
                    <th>Danh Mục</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {thuocList.map((thuoc) => {
                    const danhMuc = getDanhMucInfo(thuoc.MaDanhMuc);
                    return (
                      <tr key={thuoc.MaThuoc}>
                        <td>{thuoc.MaThuoc}</td>
                        <td>{thuoc.TenThuoc}</td>
                        <td>{thuoc.DonViTinh}</td>
                        <td>{thuoc.Gia.toLocaleString('vi-VN')} VND</td>
                        <td>{danhMuc ? danhMuc.TenDanhMuc : 'N/A'}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(thuoc)}>Sửa</button>
                          <button className="btn-delete" onClick={() => handleDelete(thuoc.MaThuoc)}>Xóa</button>
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
            title={editingThuoc ? "Cập Nhật Thuốc" : "Thêm Thuốc"}
            fields={getFormFields()}
            initialData={editingThuoc}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuanLyThuoc;