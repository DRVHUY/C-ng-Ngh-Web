import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { bacSiService, PaginationResponse } from '../../services/bacSiService';
import { BacSi, ChuyenKhoa, NguoiDung } from '../../types';
import { chuyenKhoaService } from '../../services/chuyenKhoaService';
import { nguoiDungService } from '../../services/nguoiDungService';
import '../../styles/Dashboard.css';

interface PaginationData {
  items: BacSi[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const ManageBacSi: React.FC = () => {
  const [paginationData, setPaginationData] = useState<PaginationData>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 6,
    totalPages: 0,
  });
  const [chuyenKhoaList, setChuyenKhoaList] = useState<ChuyenKhoa[]>([]);
  const [userList, setUserList] = useState<NguoiDung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBacSi, setEditingBacSi] = useState<BacSi | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'MaNguoiDung',
      label: 'Mã Người Dùng',
      type: 'select' as const,
      required: true,
      disabled: !!editingBacSi,
      options: userList.map((user: NguoiDung) => ({
        value: user.MaNguoiDung,
        label: `${user.MaNguoiDung} - ${user.TenDangNhap} (${user.HoTen})`,
      })),
    },
    {
      name: 'MaChuyenKhoa',
      label: 'Chuyên Khoa',
      type: 'select' as const,
      required: true,
      options: chuyenKhoaList.map((ck) => ({
        value: ck.MaChuyenKhoa,
        label: ck.TenChuyenKhoa,
      })),
    },
    {
      name: 'BangCap',
      label: 'Bằng Cấp',
      type: 'text' as const,
      required: true,
      placeholder: 'Ví dụ: Bác sĩ chuyên khoa',
    },
    {
      name: 'SoNamKinhNghiem',
      label: 'Số Năm Kinh Nghiệm',
      type: 'number' as const,
      required: true,
      validation: (value) => (Number(value) >= 0 ? null : 'Phải >= 0'),
    },
    {
      name: 'MoTa',
      label: 'Mô Tả',
      type: 'textarea' as const,
      required: false,
    },
  ];

  // Load chuyên khoa, người dùng và bác sĩ lần đầu
  useEffect(() => {
    loadChuyenKhoa();
    loadUsers();
    fetchData(1);
  }, []);

  const loadChuyenKhoa = async () => {
    try {
      const result = await chuyenKhoaService.getAllChuyenKhoaList();
      if (result.success && result.data) {
        setChuyenKhoaList(result.data);
      }
    } catch (err) {
      console.error('Lỗi tải chuyên khoa:', err);
    }
  };

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

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const result = (await bacSiService.getAllBacSi(page, 6)) as PaginationResponse<BacSi>;

      if (result.success && result.data) {
        setPaginationData(result.data);
        setError('');
      } else {
        setError(result.message || 'Lỗi tải danh sách bác sĩ');
      }
    } catch (err) {
      setError('Lỗi kết nối đến server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingBacSi(undefined);
    setModalOpen(true);
  };

  const handleEdit = (bacSi: BacSi) => {
    setEditingBacSi(bacSi);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingBacSi) {
        result = await bacSiService.updateBacSi(editingBacSi.MaBacSi, formData);
      } else {
        result = await bacSiService.createBacSi(formData);
      }

      if (result.success) {
        alert(editingBacSi ? 'Cập nhật bác sĩ thành công' : 'Thêm bác sĩ thành công');
        setModalOpen(false);
        await fetchData(paginationData.page);
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu bác sĩ:', err);
      alert('Lỗi lưu bác sĩ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bác sĩ này?')) return;

    try {
      const result = await bacSiService.deleteBacSi(id);
      if (result.success) {
        alert('Xóa bác sĩ thành công');
        if (paginationData.items.length === 1 && paginationData.page > 1) {
          await fetchData(paginationData.page - 1);
        } else {
          await fetchData(paginationData.page);
        }
      } else {
        alert(result.message || 'Xóa bác sĩ thất bại');
      }
    } catch (err) {
      console.error('Lỗi xóa bác sĩ:', err);
      alert('Lỗi xóa bác sĩ');
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
          <h1>Quản Lý Bác Sĩ</h1>
          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
            + Thêm Bác Sĩ
          </button>

          {error && <div className="error-alert">{error}</div>}

          {paginationData.total === 0 ? (
            <div className="welcome-box">
              <p>Chưa có bác sĩ nào</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mã BS</th>
                      <th>Mã Chuyên Khoa</th>
                      <th>Bằng Cấp</th>
                      <th>Năm Kinh Nghiệm</th>
                      <th>Mô Tả</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginationData.items.map((bs) => (
                      <tr key={bs.MaBacSi}>
                        <td>{bs.MaBacSi}</td>
                        <td>{bs.MaChuyenKhoa}</td>
                        <td>{bs.BangCap}</td>
                        <td>{bs.SoNamKinhNghiem}</td>
                        <td>{bs.MoTa}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(bs)}>
                            Sửa
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(bs.MaBacSi)}>
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
              setEditingBacSi(undefined);
            }}
            onSave={handleSave}
            title={editingBacSi ? 'Sửa Bác Sĩ' : 'Thêm Bác Sĩ'}
            fields={getFormFields()}
            initialData={editingBacSi}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageBacSi;
