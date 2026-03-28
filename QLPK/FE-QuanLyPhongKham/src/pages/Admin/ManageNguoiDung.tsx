import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { nguoiDungService, PaginationResponse } from '../../services/nguoiDungService';
import { NguoiDung } from '../../types';
import '../../../src/styles/Dashboard.css';

interface PaginationData {
  items: NguoiDung[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const ManageNguoiDung: React.FC = () => {
  const [paginationData, setPaginationData] = useState<PaginationData>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 6,
    totalPages: 0,
  });
  const [existingUsernames, setExistingUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<NguoiDung | undefined>();
  const [submitting, setSubmitting] = useState(false);

  // Lấy danh sách tên đăng nhập đã có
  const loadExistingUsernames = async () => {
    try {
      const result = await nguoiDungService.getAllUsernames();
      if (result.success && result.data) {
        setExistingUsernames(result.data.map((u) => u.TenDangNhap));
      } else {
        setExistingUsernames([]);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách tên đăng nhập:', err);
      setExistingUsernames([]);
    }
  };

  // Tạo dynamic formFields dựa trên trạng thái
  const getFormFields = (): FormField[] => [
    {
      name: 'TenDangNhap',
      label: 'Tên Đăng Nhập',
      type: 'autocomplete' as const,
      required: true,
      placeholder: 'Nhập tên đăng nhập',
      suggestions: editingUser 
        ? [editingUser.TenDangNhap, ...(existingUsernames?.filter(u => u !== editingUser.TenDangNhap) || [])] 
        : (existingUsernames || []),
    },
    {
      name: 'MatKhau',
      label: editingUser ? 'Mật Khẩu' : 'Mật Khẩu',
      type: 'text' as const,
      required: !editingUser,
      placeholder: editingUser ? 'Để trống để giữ mật khẩu cũ' : 'Nhập mật khẩu',
    },
    {
      name: 'HoTen',
      label: 'Họ Tên',
      type: 'text' as const,
      required: true,
      placeholder: 'Nhập họ tên',
    },
    {
      name: 'Email',
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'Nhập email',
    },
    {
      name: 'DienThoai',
      label: 'Điện Thoại',
      type: 'tel' as const,
      required: false,
      placeholder: 'Nhập điện thoại',
    },
    {
      name: 'VaiTro',
      label: 'Vai Trò',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'BacSi', label: 'Bác Sĩ' },
        { value: 'NhanVien', label: 'Nhân Viên' },
        { value: 'BenhNhan', label: 'Bệnh Nhân' },
      ],
    },
    {
      name: 'TrangThai',
      label: 'Trạng Thái',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'true', label: 'Kích hoạt' },
        { value: 'false', label: 'Vô hiệu hóa' },
      ],
    },
  ];

  // Load trang đầu tiên
  useEffect(() => {
    fetchData(1);
    loadExistingUsernames();
  }, []);

  // Fetch dữ liệu với phân trang
  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const result = (await nguoiDungService.getAllNguoiDung(
        page,
        6
      )) as PaginationResponse<NguoiDung>;

      if (result.success && result.data) {
        setPaginationData(result.data);
        setError('');
      } else {
        setError(result.message || 'Không thể tải người dùng');
      }
    } catch (err) {
      setError('Không thể tải người dùng');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(undefined);
    setModalOpen(true);
  };

  const handleEdit = (user: NguoiDung) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let dataToSave = {
        ...formData,
        TrangThai: formData.TrangThai === 'true' || formData.TrangThai === true,
      };

      // Khi sửa, nếu mật khẩu để trống thì không cập nhật
      if (editingUser && !formData.MatKhau) {
        delete dataToSave.MatKhau;
      }

      let result;
      if (editingUser) {
        result = await nguoiDungService.updateNguoiDung(editingUser.MaNguoiDung, dataToSave);
      } else {
        result = await nguoiDungService.createNguoiDung({
          ...dataToSave,
          NgayTao: new Date().toISOString(),
        });
      }

      if (result.success) {
        alert(editingUser ? 'Cập nhật người dùng thành công' : 'Thêm người dùng thành công');
        setModalOpen(false);
        await fetchData(paginationData.page);
        await loadExistingUsernames();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu người dùng:', err);
      alert('Lỗi lưu người dùng');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa?')) return;
    try {
      const result = await nguoiDungService.deleteNguoiDung(id);
      if (result.success) {
        alert('Xóa người dùng thành công');
        // Nếu xóa hết item trên trang, quay lại trang trước
        if (paginationData.items.length === 1 && paginationData.page > 1) {
          await fetchData(paginationData.page - 1);
        } else {
          await fetchData(paginationData.page);
        }
        await loadExistingUsernames();
      } else {
        alert(result.message || 'Xóa người dùng thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa người dùng:', err);
      alert('Lỗi xóa người dùng');
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      fetchData(page);
    }
  };

  if (loading && paginationData.items.length === 0) {
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
          <h1>Quản Lý Người Dùng</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Thêm Người Dùng
          </button>

          {error && <div className="error-alert">{error}</div>}

          {paginationData.total === 0 ? (
            <div className="welcome-box">
              <p>Chưa có người dùng nào</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Tên Đăng Nhập</th>
                      <th>Họ Tên</th>
                      <th>Email</th>
                      <th>Vai Trò</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(paginationData.items || []).map((user) => (
                      <tr key={user.MaNguoiDung}>
                        <td>{user.TenDangNhap}</td>
                        <td>{user.HoTen}</td>
                        <td>{user.Email}</td>
                        <td>{user.VaiTro || 'Chưa gán'}</td>
                        <td>{user.TrangThai ? 'Kích hoạt' : 'Vô hiệu hóa'}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(user)}>
                            Sửa
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(user.MaNguoiDung)}>
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Trang {paginationData.page} / {paginationData.totalPages} | Tổng {paginationData.total} mục | {paginationData.pageSize} mục/trang
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    className="btn-pagination"
                    onClick={() => handlePageChange(1)}
                    disabled={paginationData.page === 1}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: paginationData.page === 1 ? '#f5f5f5' : 'white',
                      cursor: paginationData.page === 1 ? 'not-allowed' : 'pointer',
                      opacity: paginationData.page === 1 ? 0.6 : 1,
                    }}
                  >
                    ← Đầu
                  </button>
                  <button
                    className="btn-pagination"
                    onClick={() => handlePageChange(paginationData.page - 1)}
                    disabled={paginationData.page === 1}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: paginationData.page === 1 ? '#f5f5f5' : 'white',
                      cursor: paginationData.page === 1 ? 'not-allowed' : 'pointer',
                      opacity: paginationData.page === 1 ? 0.6 : 1,
                    }}
                  >
                    ← Trước
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, paginationData.totalPages) }).map((_, i) => {
                    const pageNum = paginationData.page <= 3 ? i + 1 : paginationData.page + i - 2;
                    if (pageNum <= paginationData.totalPages) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: pageNum === paginationData.page ? '#007bff' : 'white',
                            color: pageNum === paginationData.page ? 'white' : 'black',
                            cursor: 'pointer',
                            fontWeight: pageNum === paginationData.page ? 'bold' : 'normal',
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}

                  <button
                    className="btn-pagination"
                    onClick={() => handlePageChange(paginationData.page + 1)}
                    disabled={paginationData.page === paginationData.totalPages}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: paginationData.page === paginationData.totalPages ? '#f5f5f5' : 'white',
                      cursor: paginationData.page === paginationData.totalPages ? 'not-allowed' : 'pointer',
                      opacity: paginationData.page === paginationData.totalPages ? 0.6 : 1,
                    }}
                  >
                    Sau →
                  </button>
                  <button
                    className="btn-pagination"
                    onClick={() => handlePageChange(paginationData.totalPages)}
                    disabled={paginationData.page === paginationData.totalPages}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: paginationData.page === paginationData.totalPages ? '#f5f5f5' : 'white',
                      cursor: paginationData.page === paginationData.totalPages ? 'not-allowed' : 'pointer',
                      opacity: paginationData.page === paginationData.totalPages ? 0.6 : 1,
                    }}
                  >
                    Cuối →
                  </button>
                </div>
              </div>
            </>
          )}

          <FormModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingUser(undefined);
            }}
            onSave={handleSave}
            title={editingUser ? 'Sửa Người Dùng' : 'Thêm Người Dùng'}
            fields={getFormFields()}
            initialData={
              editingUser
                ? {
                    TenDangNhap: editingUser.TenDangNhap,
                    HoTen: editingUser.HoTen,
                    Email: editingUser.Email,
                    DienThoai: editingUser.DienThoai || '',
                    VaiTro: editingUser.VaiTro || '',
                    TrangThai: String(editingUser.TrangThai),
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

export default ManageNguoiDung;
