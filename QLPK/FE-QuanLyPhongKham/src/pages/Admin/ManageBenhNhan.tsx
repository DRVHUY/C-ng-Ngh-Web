import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { benhNhanService } from '../../services/benhNhanService';
import { BenhNhan, NguoiDung } from '../../types';
import { nguoiDungService } from '../../services/nguoiDungService';
import '../../styles/Dashboard.css';

const ManageBenhNhan: React.FC = () => {
  const [benhNhanList, setBenhNhanList] = useState<BenhNhan[]>([]);
  const [userList, setUserList] = useState<NguoiDung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBenhNhan, setEditingBenhNhan] = useState<BenhNhan | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'MaNguoiDung',
      label: 'Mã Người Dùng',
      type: 'select',
      required: true,
      disabled: !!editingBenhNhan,
      options: userList.map((user: NguoiDung) => ({
        value: user.MaNguoiDung,
        label: `${user.MaNguoiDung} - ${user.TenDangNhap} (${user.HoTen})`,
      })),
    },
    {
      name: 'NgaySinh',
      label: 'Ngày Sinh',
      type: 'date',
      required: true,
    },
    {
      name: 'GioiTinh',
      label: 'Giới Tính',
      type: 'select',
      required: true,
      options: [
        { value: 'Nam', label: 'Nam' },
        { value: 'Nữ', label: 'Nữ' },
        { value: 'Khác', label: 'Khác' },
      ],
    },
    {
      name: 'DiaChi',
      label: 'Địa Chỉ',
      type: 'text',
      required: true,
      placeholder: 'Nhập địa chỉ',
    },
  ];

  useEffect(() => {
    loadUsers();
    loadBenhNhan();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await nguoiDungService.getAllNguoiDungList();
      if (result.success && result.data) {
        setUserList(result.data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách người dùng:', err);
    }
  };

  const loadBenhNhan = async () => {
    try {
      setLoading(true);
      const response = await benhNhanService.getAllBenhNhanList();
      if (response.success && response.data) {
        setBenhNhanList(response.data);
        setError('');
      } else {
        setError(response.message || 'Lỗi tải danh sách bệnh nhân');
      }
    } catch (err) {
      setError('Lỗi kết nối đến server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingBenhNhan(undefined);
    setModalOpen(true);
  };

  const handleEdit = (benhNhan: BenhNhan) => {
    setEditingBenhNhan(benhNhan);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingBenhNhan) {
        result = await benhNhanService.updateBenhNhan(editingBenhNhan.MaBenhNhan, formData);
      } else {
        result = await benhNhanService.createBenhNhan(formData);
      }

      if (result.success) {
        alert(editingBenhNhan ? 'Cập nhật bệnh nhân thành công' : 'Thêm bệnh nhân thành công');
        loadBenhNhan();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu bệnh nhân:', err);
      alert('Lỗi lưu bệnh nhân');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bệnh nhân này?')) return;

    try {
      const result = await benhNhanService.deleteBenhNhan(id);
      if (result.success) {
        alert('Xóa bệnh nhân thành công');
        setBenhNhanList((prev) => prev.filter((item) => item.MaBenhNhan !== id));
      } else {
        alert(result.message || 'Xóa bệnh nhân thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa bệnh nhân:', err);
      alert('Lỗi xóa bệnh nhân');
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Quản Lý Bệnh Nhân</h1>
          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
            + Thêm Bệnh Nhân
          </button>

          {error && <div className="error-alert">{error}</div>}

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã BN</th>
                    <th>Ngày Sinh</th>
                    <th>Giới Tính</th>
                    <th>Địa Chỉ</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {benhNhanList.map((bn) => (
                    <tr key={bn.MaBenhNhan}>
                      <td>{bn.MaBenhNhan}</td>
                      <td>{new Date(bn.NgaySinh).toLocaleDateString('vi-VN')}</td>
                      <td>{bn.GioiTinh}</td>
                      <td>{bn.DiaChi}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(bn)}>
                          Sửa
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(bn.MaBenhNhan)}>
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
            title={editingBenhNhan ? 'Sửa Bệnh Nhân' : 'Thêm Bệnh Nhân'}
            fields={getFormFields()}
            initialData={
              editingBenhNhan
                ? {
                    MaNguoiDung: editingBenhNhan.MaNguoiDung,
                    NgaySinh: editingBenhNhan.NgaySinh,
                    GioiTinh: editingBenhNhan.GioiTinh,
                    DiaChi: editingBenhNhan.DiaChi,
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

export default ManageBenhNhan;
