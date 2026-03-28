"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NguoiDungController_1 = require("../controllers/NguoiDungController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
const router = (0, express_1.Router)();
const controller = new NguoiDungController_1.NguoiDungController();
// Login (không cần xác thực)
router.post('/dang-nhap', (req, res) => controller.dangNhap(req, res));
// Create user (Admin hoặc nhân viên)
router.post('/', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin', 'NhanVien'), (req, res) => controller.taoMoi(req, res));
// Get all (yêu cầu xác thực)
router.get('/', authMiddleware_1.authenticateToken, (req, res) => controller.layTatCa(req, res));
// Search by name or username
router.get('/search', authMiddleware_1.authenticateToken, (req, res) => controller.timKiem(req, res));
// Get by ID (yêu cầu xác thực)
router.get('/:id', authMiddleware_1.authenticateToken, (req, res) => controller.layTheoId(req, res));
// Update (admin hoặc chính chủ)
router.put('/:id', authMiddleware_1.authenticateToken, authorizationMiddleware_1.authorizeOwnerOrAdmin, (req, res) => controller.capNhat(req, res));
// Delete (yêu cầu admin)
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin'), (req, res) => controller.xoa(req, res));
exports.default = router;
//# sourceMappingURL=nguoiDung.js.map