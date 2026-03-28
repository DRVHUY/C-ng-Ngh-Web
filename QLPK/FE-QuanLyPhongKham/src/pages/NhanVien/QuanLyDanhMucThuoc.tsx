import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { danhMucThuocService } from '../../services/thuocService';
import { DanhMucThuoc } from '../../types';
import '../../../src/styles/Dashboard.css';

const QuanLyDanhMucThuoc: React.FC = () => {
  const [danhMucList, setDanhMucList] = useState<DanhMucThuoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDanhMuc, setEditingDanhMuc] = useState<DanhMucThuoc | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'TenDanhMuc',
      label: 'Tên Danh Mục',
      type: 'text',
      required: true,
    },
  ];

  useEffect(() => {
    loadDanhMuc();
  }, []);

  const loadDanhMuc = async () => {
    try {
      setLoading(true);
      const result = await danhMucThuocService.getAllDanhMucThuocList();
      if (result.success && result.data) {
        setDanhMucList(result.data);
        setError('');
      } else {
        setError(result.message || 'Không thể tải danh mục thuốc');
      }
    } catch (err) {
      setError('Lỗi khi tải danh mục thuốc');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDanhMuc(undefined);
    setModalOpen(true);
  };

  const handleEdit = (danhMuc: DanhMucThuoc) => {
    setEditingDanhMuc(danhMuc);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingDanhMuc) {
        result = await danhMucThuocService.updateDanhMucThuoc(editingDanhMuc.MaDanhMuc, formData);
      } else {
        result = await danhMucThuocService.createDanhMucThuoc(formData);
      }

      if (result.success) {
        alert(editingDanhMuc ? 'Cập nhật danh mục thành công' : 'Tạo danh mục thành công');
        loadDanhMuc();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu danh mục:', err);
      alert('Lỗi lưu danh mục');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa danh mục này?')) return;

    try {
      const result = await danhMucThuocService.deleteDanhMucThuoc(id);
      if (result.success) {
        alert('Xóa danh mục thành công');
        setDanhMucList((prev) => prev.filter((item) => item.MaDanhMuc !== id));
      } else {
        alert(result.message || 'Xóa danh mục thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa danh mục:', err);
      alert('Lỗi xóa danh mục');
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
          <h1>Quản Lý Danh Mục Thuốc</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Danh Mục
          </button>

          {error && <div className="error-alert">{error}</div>}

          {danhMucList.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có danh mục thuốc nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Danh Mục</th>
                    <th>Tên Danh Mục</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {danhMucList.map((danhMuc) => (
                    <tr key={danhMuc.MaDanhMuc}>
                      <td>{danhMuc.MaDanhMuc}</td>
                      <td>{danhMuc.TenDanhMuc}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(danhMuc)}>Sửa</button>
                        <button className="btn-delete" onClick={() => handleDelete(danhMuc.MaDanhMuc)}>Xóa</button>
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
            title={editingDanhMuc ? "Cập Nhật Danh Mục Thuốc" : "Thêm Danh Mục Thuốc"}
            fields={getFormFields()}
            initialData={editingDanhMuc}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuanLyDanhMucThuoc;