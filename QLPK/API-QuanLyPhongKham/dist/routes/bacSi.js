"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BacSiController_1 = require("../controllers/BacSiController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
const router = (0, express_1.Router)();
const controller = new BacSiController_1.BacSiController();
// Get all (yêu cầu xác thực)
router.get('/', authMiddleware_1.authenticateToken, (req, res) => controller.layTatCa(req, res));
// Search by doctor name
router.get('/search', authMiddleware_1.authenticateToken, (req, res) => controller.timKiem(req, res));
// Get by specialty
router.get('/chuyen-khoa/:maChuyenKhoa', authMiddleware_1.authenticateToken, (req, res) => controller.layTheoChuyenKhoa(req, res));
// Get by ID (yêu cầu xác thực)
router.get('/:id', authMiddleware_1.authenticateToken, (req, res) => controller.layTheoId(req, res));
// Create
router.post('/', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin', 'NhanVien'), (req, res) => controller.taoMoi(req, res));
// Update
router.put('/:id', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin', 'NhanVien'), (req, res) => controller.capNhat(req, res));
// Delete - chỉ Admin
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin'), (req, res) => controller.xoa(req, res));
exports.default = router;
//# sourceMappingURL=bacSi.js.map