"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LichHenController_1 = require("../controllers/LichHenController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
const router = (0, express_1.Router)();
const controller = new LichHenController_1.LichHenController();
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
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authorizationMiddleware_1.authorize)('Admin'), (req, res) => controller.xoa(req, res));
exports.default = router;
//# sourceMappingURL=lichHen.js.map