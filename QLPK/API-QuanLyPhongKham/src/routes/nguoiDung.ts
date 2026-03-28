import { Router } from 'express';
import { NguoiDungController } from '../controllers/NguoiDungController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize, authorizeOwnerOrAdmin } from '../middlewares/authorizationMiddleware';

const router = Router();
const controller = new NguoiDungController();

// Login (không cần xác thực)
router.post('/dang-nhap', (req, res) => controller.dangNhap(req, res));

// Create user (Admin hoặc nhân viên)
router.post('/', authenticateToken, authorize('Admin', 'NhanVien'), (req, res) => controller.taoMoi(req, res));

// Get all (yêu cầu xác thực)
router.get('/', authenticateToken, (req, res) => controller.layTatCa(req, res));

// Search by name or username
router.get('/search', authenticateToken, (req, res) => controller.timKiem(req, res));

// Get by ID (yêu cầu xác thực)
router.get('/:id', authenticateToken, (req, res) => controller.layTheoId(req, res));

// Update (admin hoặc chính chủ)
router.put('/:id', authenticateToken, authorizeOwnerOrAdmin, (req, res) => controller.capNhat(req, res));

// Delete (yêu cầu admin)
router.delete('/:id', authenticateToken, authorize('Admin'), (req, res) => controller.xoa(req, res));

export default router;

