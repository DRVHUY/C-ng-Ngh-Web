"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nguoiDung_1 = __importDefault(require("./nguoiDung"));
const bacSi_1 = __importDefault(require("./bacSi"));
const benhNhan_1 = __importDefault(require("./benhNhan"));
const chuyenKhoa_1 = __importDefault(require("./chuyenKhoa"));
const lichHen_1 = __importDefault(require("./lichHen"));
const hoaDon_1 = __importDefault(require("./hoaDon"));
const vaiTro_1 = __importDefault(require("./vaiTro"));
const hoSoBenhNhan_1 = __importDefault(require("./hoSoBenhNhan"));
const hoSoKhamBenh_1 = __importDefault(require("./hoSoKhamBenh"));
const donThuoc_1 = __importDefault(require("./donThuoc"));
const thuoc_1 = __importDefault(require("./thuoc"));
const router = (0, express_1.Router)();
router.use('/api/vai-tro', vaiTro_1.default);
router.use('/api/nguoi-dung', nguoiDung_1.default);
router.use('/api/bac-si', bacSi_1.default);
router.use('/api/benh-nhan', benhNhan_1.default);
router.use('/api/ho-so-benh-nhan', hoSoBenhNhan_1.default);
router.use('/api/chuyen-khoa', chuyenKhoa_1.default);
router.use('/api/lich-hen', lichHen_1.default);
router.use('/api/ho-so-kham-benh', hoSoKhamBenh_1.default);
router.use('/api/don-thuoc', donThuoc_1.default);
router.use('/api/hoa-don', hoaDon_1.default);
router.use('/api', thuoc_1.default); // Thêm router thuốc và danh mục
// Health check
router.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Quản lý Phòng khám đang hoạt động' });
});
exports.default = router;
//# sourceMappingURL=index.js.map