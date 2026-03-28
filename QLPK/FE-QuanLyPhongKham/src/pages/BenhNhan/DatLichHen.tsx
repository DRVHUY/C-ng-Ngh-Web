import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { bacSiService } from '../../services/bacSiService';
import { lichHenService, benhNhanService } from '../../services/benhNhanService';
import { BacSi, BenhNhan } from '../../types';
import '../../../src/styles/Dashboard.css';

const DatLichHen: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    NgayKham: '',
    GioKham: '',
    MaBacSi: '',
    LyDo: '',
  });
  const [bacSiList, setBacSiList] = useState<BacSi[]>([]);
  const [benhNhanList, setBenhNhanList] = useState<BenhNhan[]>([]);
  const [currentPatientId, setCurrentPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadBacSi();
    loadBenhNhan();
  }, []);

  const loadBacSi = async () => {
    try {
      const result = await bacSiService.getAllBacSiList();
      if (result.success && result.data) {
        setBacSiList(result.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách bác sĩ:', err);
    }
  };

  const loadBenhNhan = async () => {
    try {
      const result = await benhNhanService.getAllBenhNhanList();
      if (result.success && result.data) {
        setBenhNhanList(result.data);
        if (user) {
          const matched = result.data.find((bn) => bn.MaNguoiDung === user.MaNguoiDung);
          if (matched) {
            setCurrentPatientId(matched.MaBenhNhan);
          }
        }
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách bệnh nhân:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    setError('');
    setSuccess('');

    if (!currentPatientId) {
      setError('Không tìm thấy bệnh nhân hiện tại.');
      setLoading(false);
      return;
    }

    try {
      const thoiGianHen = `${formData.NgayKham}T${formData.GioKham}:00`;
      const response = await lichHenService.bookAppointment({
        MaBacSi: Number(formData.MaBacSi),
        MaBenhNhan: currentPatientId,
        MaLich: 0,
        ThoiGianHen: thoiGianHen,
      });

      if (response.success) {
        setSuccess('Đặt lịch khám thành công!');
        setFormData({ NgayKham: '', GioKham: '', MaBacSi: '', LyDo: '' });
      } else {
        setError(response.message || 'Lỗi trong quá trình đặt lịch');
      }
    } catch (err) {
      setError('Lỗi trong quá trình đặt lịch');
      console.error(err);
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
          <h1>Đặt Lịch Khám</h1>

          {error && <div className="error-alert">{error}</div>}
          {success && <div style={{ ...{ padding: '12px', borderRadius: '5px', marginBottom: '20px' }, backgroundColor: '#e7f5f0', color: '#0d5c4a' }}>{success}</div>}

          <div className="welcome-box">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Ngày Khám</label>
                <input
                  type="date"
                  name="NgayKham"
                  value={formData.NgayKham}
                  onChange={handleChange}
                  required
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Giờ Khám</label>
                <input
                  type="time"
                  name="GioKham"
                  value={formData.GioKham}
                  onChange={handleChange}
                  required
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Chọn Bác Sĩ</label>
                <select
                  name="MaBacSi"
                  value={formData.MaBacSi}
                  onChange={handleChange}
                  required
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                >
                  <option value="">-- Chọn bác sĩ --</option>
                  {bacSiList.map((bs) => (
                    <option key={bs.MaBacSi} value={bs.MaBacSi}>
                      {`${bs.MaBacSi} - Mã người dùng: ${bs.MaNguoiDung}`}
                    </option>
                  ))}
                </select>
              </div>
              {currentPatientId && (
                <div style={{ marginTop: '10px', color: '#333' }}>
                  <strong>Bệnh nhân:</strong> {currentPatientId}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Lý Do Khám</label>
                <textarea
                  name="LyDo"
                  value={formData.LyDo}
                  onChange={handleChange}
                  placeholder="Mô tả triệu chứng hoặc lý do khám"
                  rows={4}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ marginTop: '10px' }}
              >
                {loading ? 'Đang xử lý...' : 'Đặt Lịch'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatLichHen;
