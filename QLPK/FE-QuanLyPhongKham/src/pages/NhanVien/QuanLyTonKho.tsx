import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FormModal, { FormField } from '../../components/FormModal';
import { tonKhoService, thuocService } from '../../services/thuocService';
import { TonKho, Thuoc } from '../../types';
import '../../../src/styles/Dashboard.css';

const QuanLyTonKho: React.FC = () => {
  const [tonKhoList, setTonKhoList] = useState<TonKho[]>([]);
  const [thuocList, setThuocList] = useState<Thuoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTonKho, setEditingTonKho] = useState<TonKho | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const getFormFields = (): FormField[] => [
    {
      name: 'MaThuoc',
      label: 'Thuốc',
      type: 'select',
      required: true,
      options: thuocList.map((thuoc) => ({
        value: thuoc.MaThuoc.toString(),
        label: `${thuoc.TenThuoc} (${thuoc.DonViTinh})`,
      })),
    },
    {
      name: 'SoLuongTon',
      label: 'Số Lượng Tồn',
      type: 'number',
      required: true,
      validation: (value) => (Number(value) >= 0 ? null : 'Số lượng phải >= 0'),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tonKhoRes, thuocRes] = await Promise.all([
        tonKhoService.getAllTonKhoList(),
        thuocService.getAllThuocList(),
      ]);

      if (tonKhoRes.success && tonKhoRes.data) setTonKhoList(tonKhoRes.data);
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
    setEditingTonKho(undefined);
    setModalOpen(true);
  };

  const handleEdit = (tonKho: TonKho) => {
    setEditingTonKho(tonKho);
    setModalOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      setSubmitting(true);
      let result;

      if (editingTonKho) {
        result = await tonKhoService.updateTonKho(editingTonKho.MaTonKho, formData);
      } else {
        // Tạo tồn kho mới với ngày cập nhật hiện tại
        result = await tonKhoService.updateTonKho(0, {
          ...formData,
          NgayCapNhat: new Date().toISOString(),
        });
      }

      if (result.success) {
        alert(editingTonKho ? 'Cập nhật tồn kho thành công' : 'Tạo tồn kho thành công');
        loadData();
      } else {
        alert(result.message || 'Thao tác thất bại');
      }
    } catch (err) {
      console.error('Lỗi lưu tồn kho:', err);
      alert('Lỗi lưu tồn kho');
    } finally {
      setSubmitting(false);
    }
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
          <h1>Quản Lý Tồn Kho</h1>

          <button className="btn-primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
            + Cập Nhật Tồn Kho
          </button>

          {error && <div className="error-alert">{error}</div>}

          {tonKhoList.length === 0 ? (
            <div className="welcome-box">
              <p>Chưa có dữ liệu tồn kho nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Tồn Kho</th>
                    <th>Thuốc</th>
                    <th>Số Lượng Tồn</th>
                    <th>Ngày Cập Nhật</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {tonKhoList.map((tonKho) => {
                    const thuoc = getThuocInfo(tonKho.MaThuoc);
                    return (
                      <tr key={tonKho.MaTonKho}>
                        <td>{tonKho.MaTonKho}</td>
                        <td>{thuoc ? `${thuoc.TenThuoc} (${thuoc.DonViTinh})` : 'N/A'}</td>
                        <td>{tonKho.SoLuongTon}</td>
                        <td>{new Date(tonKho.NgayCapNhat).toLocaleDateString('vi-VN')}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(tonKho)}>Cập Nhật</button>
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
            title={editingTonKho ? "Cập Nhật Tồn Kho" : "Thêm Tồn Kho"}
            fields={getFormFields()}
            initialData={editingTonKho}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuanLyTonKho;