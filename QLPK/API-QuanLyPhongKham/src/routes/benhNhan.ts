import { Router } from 'express';
import { BenhNhanController } from '../controllers/BenhNhanController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizationMiddleware';

const router = Router();
const controller = new BenhNhanController();

// Get all (yêu cầu xác thực)
router.get('/', authenticateToken, (req, res) => controller.layTatCa(req, res));

// Search by patient name
router.get('/search', authenticateToken, (req, res) => controller.timKiem(req, res));

// Get by ID (yêu cầu xác thực)
router.get('/:id', authenticateToken, (req, res) => controller.layTheoId(req, res));

// Create
router.post('/', authenticateToken, authorize('Admin', 'NhanVien'), (req, res) => controller.taoMoi(req, res));

// Update
router.put('/:id', authenticateToken, authorize('Admin', 'NhanVien'), (req, res) => controller.capNhat(req, res));

// Delete - chỉ Admin
router.delete('/:id', authenticateToken, authorize('Admin'), (req, res) => controller.xoa(req, res));

export default router;
