import { Router } from 'express';
import nguoiDungRouter from './nguoiDung';
import bacSiRouter from './bacSi';
import benhNhanRouter from './benhNhan';
import chuyenKhoaRouter from './chuyenKhoa';
import lichHenRouter from './lichHen';
import hoaDonRouter from './hoaDon';
import vaiTroRouter from './vaiTro';
import hoSoBenhNhanRouter from './hoSoBenhNhan';
import hoSoKhamBenhRouter from './hoSoKhamBenh';
import donThuocRouter from './donThuoc';
import thuocRouter from './thuoc';

const router = Router();

router.use('/api/vai-tro', vaiTroRouter);
router.use('/api/nguoi-dung', nguoiDungRouter);
router.use('/api/bac-si', bacSiRouter);
router.use('/api/benh-nhan', benhNhanRouter);
router.use('/api/ho-so-benh-nhan', hoSoBenhNhanRouter);
router.use('/api/chuyen-khoa', chuyenKhoaRouter);
router.use('/api/lich-hen', lichHenRouter);
router.use('/api/ho-so-kham-benh', hoSoKhamBenhRouter);
router.use('/api/don-thuoc', donThuocRouter);
router.use('/api/hoa-don', hoaDonRouter);
router.use('/api', thuocRouter); // Thêm router thuốc và danh mục

// Health check
router.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Quản lý Phòng khám đang hoạt động' });
});

export default router;
