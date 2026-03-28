import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { chuyenKhoaService } from '../../services/chuyenKhoaService';
import { ChuyenKhoa } from '../../types';
import '../../../src/styles/Dashboard.css';

const ManageChuyenKhoa: React.FC = () => {
  const [specialties, setSpecialties] = useState<ChuyenKhoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<ChuyenKhoa | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const formFields: FormField[] = [
    {
      name: 'TenChuyenKhoa',
      label: 'Tên Chuyên Khoa',
      type: 'text',
      required: true,
      placeholder: 'Ví dụ: Nội khoa',
    },
    {
      name: 'MoTa',
      label: 'Mô Tả',
      type: 'textarea',
      required: true,
    },
  ];

  useEffect(() => {
    loadSpecialties();
  }, []);

  const loadSpecialties = async () => {
    try {
      setLoading(true);
      const response = await chuyenKhoaService.getAllChuyenKhoaList();
      if (response.success && response.data) {
        setSpecialties(response.data);
        setError('');
      } else {
        setError(response.message || 'Không thể tải chuyên khoa');
      }
    } catch (err) {
      setError('Không thể tải chuyên khoa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSpecialty(undefined);
    setModalOpen(true);
  };

  const handleEdit = (specialty: ChuyenKhoa) => {
    setEditingSpecialty(specialty);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);

      const payload = {
        TenChuyenKhoa: formData.TenChuyenKhoa,
        MoTa: formData.MoTa,
      };

      let result;
      if (editingSpecialty) {
        result = await chuyenKhoaService.updateChuyenKhoa(editingSpecialty.MaChuyenKhoa, payload);
      } else {
        result = await chuyenKhoaService.createChuyenKhoa(payload as Omit<ChuyenKhoa, 'MaChuyenKhoa'>);
      }

      if (result.success) {
        alert(editingSpecialty ? 'Cập nhật chuyên khoa thành công' : 'Thêm chuyên khoa thành công');
        loadSpecialties();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu chuyên khoa:', err);
      alert('Lỗi lưu chuyên khoa');
    } finally {
      setSubmitting(false);
      setModalOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa?')) return;

    try {
      const result = await chuyenKhoaService.deleteChuyenKhoa(id);
      if (result.success) {
        alert('Xóa chuyên khoa thành công');
        setSpecialties((prev) => prev.filter((item) => item.MaChuyenKhoa !== id));
      } else {
        alert(result.message || 'Xóa chuyên khoa thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa chuyên khoa:', err);
      alert('Lỗi xóa chuyên khoa');
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
          <h1>Quản Lý Chuyên Khoa</h1>

          {error && <div className="error-alert">{error}</div>}

          <button className="btn-primary" style={{ marginBottom: '20px' }} onClick={handleAdd}>
            + Thêm Chuyên Khoa
          </button>

          {specialties.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có chuyên khoa nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Chuyên Khoa</th>
                    <th>Tên Chuyên Khoa</th>
                    <th>Mô Tả</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {specialties.map((specialty) => (
                    <tr key={specialty.MaChuyenKhoa}>
                      <td>{specialty.MaChuyenKhoa}</td>
                      <td>{specialty.TenChuyenKhoa}</td>
                      <td>{specialty.MoTa}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(specialty)}>
                          Sửa
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(specialty.MaChuyenKhoa)}
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
            title={editingSpecialty ? 'Sửa Chuyên Khoa' : 'Thêm Chuyên Khoa'}
            fields={formFields}
            initialData={
              editingSpecialty
                ? {
                    TenChuyenKhoa: editingSpecialty.TenChuyenKhoa,
                    MoTa: editingSpecialty.MoTa,
                  }
                : undefined
            }
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageChuyenKhoa;
