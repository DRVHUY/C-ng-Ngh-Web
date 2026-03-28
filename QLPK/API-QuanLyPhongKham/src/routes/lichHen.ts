import { Router } from 'express';
import { LichHenController } from '../controllers/LichHenController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizationMiddleware';

const router = Router();
const controller = new LichHenController();

// Get all
router.get('/', (req, res) => controller.layTatCa(req, res));

// Get by ID
router.get('/:id', (req, res) => controller.layTheoId(req, res));

// Get by patient
router.get('/benh-nhan/:maBenhNhan', (req, res) => controller.layTheoBenhNhan(req, res));

// Create
router.post('/', (req, res) => controller.taoMoi(req, res));

// Update
router.put('/:id', (req, res) => controller.capNhat(req, res));

// Delete - chỉ Admin
router.delete('/:id', authenticateToken, authorize('Admin'), (req, res) => controller.xoa(req, res));

export default router;
