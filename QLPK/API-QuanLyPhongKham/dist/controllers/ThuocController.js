"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiTietDonThuocController = exports.ChiTietPhieuNhapController = exports.PhieuNhapThuocController = exports.TonKhoController = exports.ThuocController = exports.DanhMucThuocController = void 0;
const ThuocService_1 = require("../services/ThuocService");
class DanhMucThuocController {
    constructor() {
        this.service = new ThuocService_1.DanhMucThuocService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoId(req, res) {
        try {
            const data = await this.service.layTheoId(parseInt(req.params.id));
            if (!data) {
                res.status(404).json({ success: false, message: 'Không tìm thấy' });
                return;
            }
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async taoMoi(req, res) {
        try {
            const data = await this.service.taoMoi(req.body);
            res.status(201).json({ success: true, message: 'Tạo thành công', data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async capNhat(req, res) {
        try {
            const data = await this.service.capNhat(parseInt(req.params.id), req.body);
            res.json({ success: true, message: 'Cập nhật thành công', data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async xoa(req, res) {
        try {
            await this.service.xoa(parseInt(req.params.id));
            res.json({ success: true, message: 'Xóa thành công' });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
}
exports.DanhMucThuocController = DanhMucThuocController;
class ThuocController {
    constructor() {
        this.service = new ThuocService_1.ThuocService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoId(req, res) {
        try {
            const value = await this.service.layTheoId(parseInt(req.params.id));
            if (!value) {
                res.status(404).json({ success: false, message: 'Không tìm thấy thuốc' });
                return;
            }
            res.json({ success: true, data: value });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoDanhMuc(req, res) {
        try {
            const value = await this.service.layTheoDanhMuc(parseInt(req.params.id));
            res.json({ success: true, data: value });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async taoMoi(req, res) {
        try {
            const data = await this.service.taoMoi(req.body);
            res.status(201).json({ success: true, message: 'Tạo thuốc thành công', data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async capNhat(req, res) {
        try {
            const data = await this.service.capNhat(parseInt(req.params.id), req.body);
            res.json({ success: true, message: 'Cập nhật thành công', data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async xoa(req, res) {
        try {
            await this.service.xoa(parseInt(req.params.id));
            res.json({ success: true, message: 'Xóa thuốc thành công' });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
}
exports.ThuocController = ThuocController;
class TonKhoController {
    constructor() {
        this.service = new ThuocService_1.TonKhoService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoId(req, res) {
        try {
            const value = await this.service.layTheoId(parseInt(req.params.id));
            if (!value) {
                res.status(404).json({ success: false, message: 'Không tìm thấy tồn kho' });
                return;
            }
            res.json({ success: true, data: value });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoThuoc(req, res) {
        try {
            const value = await this.service.layTheoThuoc(parseInt(req.params.id));
            res.json({ success: true, data: value });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async capNhat(req, res) {
        try {
            const data = await this.service.capNhat(parseInt(req.params.id), req.body);
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
}
exports.TonKhoController = TonKhoController;
class PhieuNhapThuocController {
    constructor() {
        this.service = new ThuocService_1.PhieuNhapThuocService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoId(req, res) {
        try {
            const value = await this.service.layTheoId(parseInt(req.params.id));
            if (!value) {
                res.status(404).json({ success: false, message: 'Không tìm thấy phiếu nhập' });
                return;
            }
            res.json({ success: true, data: value });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async taoMoi(req, res) {
        try {
            const data = await this.service.taoMoi(req.body);
            res.status(201).json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async capNhat(req, res) {
        try {
            const data = await this.service.capNhat(parseInt(req.params.id), req.body);
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async xoa(req, res) {
        try {
            await this.service.xoa(parseInt(req.params.id));
            res.json({ success: true, message: 'Xóa phiếu nhập thành công' });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
}
exports.PhieuNhapThuocController = PhieuNhapThuocController;
class ChiTietPhieuNhapController {
    constructor() {
        this.service = new ThuocService_1.ChiTietPhieuNhapService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoPhieu(req, res) {
        try {
            const data = await this.service.layTheoPhieu(parseInt(req.params.id));
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoId(req, res) {
        try {
            const data = await this.service.layTheoId(parseInt(req.params.id));
            if (!data) {
                res.status(404).json({ success: false, message: 'Không tìm thấy chi tiết phiếu nhập' });
                return;
            }
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async taoMoi(req, res) {
        try {
            const data = await this.service.taoMoi(req.body);
            res.status(201).json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
}
exports.ChiTietPhieuNhapController = ChiTietPhieuNhapController;
class ChiTietDonThuocController {
    constructor() {
        this.service = new ThuocService_1.ChiTietDonThuocService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoDon(req, res) {
        try {
            const data = await this.service.layTheoDon(parseInt(req.params.id));
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async layTheoId(req, res) {
        try {
            const data = await this.service.layTheoId(parseInt(req.params.id));
            if (!data) {
                res.status(404).json({ success: false, message: 'Không tìm thấy chi tiết đơn thuốc' });
                return;
            }
            res.json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
    async taoMoi(req, res) {
        try {
            const data = await this.service.taoMoi(req.body);
            res.status(201).json({ success: true, data });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
        }
    }
}
exports.ChiTietDonThuocController = ChiTietDonThuocController;
//# sourceMappingURL=ThuocController.js.map