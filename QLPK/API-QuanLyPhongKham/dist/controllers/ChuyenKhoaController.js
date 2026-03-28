"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChuyenKhoaController = void 0;
const ChuyenKhoaService_1 = require("../services/ChuyenKhoaService");
class ChuyenKhoaController {
    constructor() {
        this.service = new ChuyenKhoaService_1.ChuyenKhoaService();
    }
    async layTatCa(req, res) {
        try {
            const data = await this.service.layTatCa();
            res.json({ success: true, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async layTheoId(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.layTheoId(parseInt(id));
            if (!data) {
                res.status(404).json({ success: false, message: 'Chuyên khoa không tồn tại' });
                return;
            }
            res.json({ success: true, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async taoMoi(req, res) {
        try {
            const { TenChuyenKhoa, MoTa } = req.body;
            if (!TenChuyenKhoa) {
                res.status(400).json({ success: false, message: 'Tên chuyên khoa là bắt buộc' });
                return;
            }
            const data = await this.service.taoMoi({ TenChuyenKhoa, MoTa });
            res.status(201).json({ success: true, message: 'Tạo chuyên khoa thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async capNhat(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.capNhat(parseInt(id), req.body);
            res.json({ success: true, message: 'Cập nhật chuyên khoa thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async xoa(req, res) {
        try {
            const { id } = req.params;
            await this.service.xoa(parseInt(id));
            res.json({ success: true, message: 'Xóa chuyên khoa thành công' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
}
exports.ChuyenKhoaController = ChuyenKhoaController;
//# sourceMappingURL=ChuyenKhoaController.js.map