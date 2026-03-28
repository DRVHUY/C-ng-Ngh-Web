import { Router } from 'express';
import { DonThuocController } from '../controllers/DonThuocController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizationMiddleware';

const router = Router();
const controller = new DonThuocController();

// Get all
router.get('/', (req, res) => controller.layTatCa(req, res));

// Get by ID
router.get('/:id', (req, res) => controller.layTheoId(req, res));

// Create
router.post('/', (req, res) => controller.taoMoi(req, res));

// Delete - chỉ Admin
router.delete('/:id', authenticateToken, authorize('Admin'), (req, res) => controller.xoa(req, res));

export default router;
