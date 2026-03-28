"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BenhNhanController_1 = require("../controllers/BenhNhanController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
const router = (0, express_1.Router)();
const controller = new BenhNhanController_1.BenhNhanController();
// Get all (yêu cầu xác thực)
router.get('/', authMiddleware_1.authenticateToken, (req, res) => controller.layTatCa(req, res));
// Search by patient name
router.get('/search', authMiddleware_1.authenticateToken, (req, res) => controller.timKiem(req, res));
// Get by ID (yêu cầu xác thực)
router.get('/:id', authMiddleware_1.authenticateToken, (req, res) => controller.layTheoId(req, res));
// Create
router.post('/', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin', 'NhanVien'), (req, res) => controller.taoMoi(req, res));
// Update
router.put('/:id', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin', 'NhanVien'), (req, res) => controller.capNhat(req, res));
// Delete - chỉ Admin
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin'), (req, res) => controller.xoa(req, res));
exports.default = router;
//# sourceMappingURL=benhNhan.js.map