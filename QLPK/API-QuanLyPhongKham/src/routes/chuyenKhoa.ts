import { Router } from 'express';
import { ChuyenKhoaController } from '../controllers/ChuyenKhoaController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizationMiddleware';

const router = Router();
const controller = new ChuyenKhoaController();

// Get all
router.get('/', (req, res) => controller.layTatCa(req, res));

// Get by ID
router.get('/:id', (req, res) => controller.layTheoId(req, res));

// Create
router.post('/', (req, res) => controller.taoMoi(req, res));

// Update
router.put('/:id', (req, res) => controller.capNhat(req, res));

// Delete - chỉ Admin
router.delete('/:id', authenticateToken, authorize('Admin'), (req, res) => controller.xoa(req, res));

export default router;
