import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import '../../../src/styles/Dashboard.css';

const HoSoCaNhan: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    HoTen: user?.HoTen || '',
    Email: user?.Email || '',
    DienThoai: user?.DienThoai || '',
    DiaChi: user?.DiaChi || '',
    NgaySinh: user?.NgaySinh || '',
    GioiTinh: user?.GioiTinh || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Call API to update profile
      setIsEditing(false);
    } catch (err) {
      console.error('Lỗi cập nhật hồ sơ:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Hồ Sơ Cá Nhân</h1>

          <div className="welcome-box">
            {!isEditing ? (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <p><strong>Họ Tên:</strong> {formData.HoTen}</p>
                  <p><strong>Email:</strong> {formData.Email}</p>
                  <p><strong>Điện Thoại:</strong> {formData.DienThoai}</p>
                  <p><strong>Địa Chỉ:</strong> {formData.DiaChi}</p>
                  <p><strong>Ngày Sinh:</strong> {formData.NgaySinh}</p>
                  <p><strong>Giới Tính:</strong> {formData.GioiTinh}</p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh Sửa
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label>Họ Tên</label>
                  <input
                    name="HoTen"
                    value={formData.HoTen}
                    onChange={handleChange}
                    type="text"
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%' }}
                  />
                </div>

                <div>
                  <label>Điện Thoại</label>
                  <input
                    name="DienThoai"
                    value={formData.DienThoai}
                    onChange={handleChange}
                    type="tel"
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%' }}
                  />
                </div>

                <div>
                  <label>Địa Chỉ</label>
                  <input
                    name="DiaChi"
                    value={formData.DiaChi}
                    onChange={handleChange}
                    type="text"
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%' }}
                  />
                </div>

                <div>
                  <label>Ngày Sinh</label>
                  <input
                    name="NgaySinh"
                    value={formData.NgaySinh}
                    onChange={handleChange}
                    type="date"
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%' }}
                  />
                </div>

                <div>
                  <label>Giới Tính</label>
                  <select
                    name="GioiTinh"
                    value={formData.GioiTinh}
                    onChange={handleChange}
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%' }}
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? 'Đang lưu...' : 'Lưu'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    style={{
                      background: '#ccc',
                      color: '#333',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoSoCaNhan;
