"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenhNhanController = void 0;
const BenhNhanService_1 = require("../services/BenhNhanService");
class BenhNhanController {
    constructor() {
        this.service = new BenhNhanService_1.BenhNhanService();
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
                res.status(404).json({ success: false, message: 'Bệnh nhân không tồn tại' });
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
            const { MaNguoiDung, NgaySinh, GioiTinh, DiaChi } = req.body;
            if (!MaNguoiDung) {
                res.status(400).json({ success: false, message: 'Mã người dùng là bắt buộc' });
                return;
            }
            const data = await this.service.taoMoi({
                MaNguoiDung,
                NgaySinh,
                GioiTinh,
                DiaChi,
            });
            res.status(201).json({ success: true, message: 'Tạo bệnh nhân thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async capNhat(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.capNhat(parseInt(id), req.body);
            res.json({ success: true, message: 'Cập nhật bệnh nhân thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async xoa(req, res) {
        try {
            const { id } = req.params;
            await this.service.xoa(parseInt(id));
            res.json({ success: true, message: 'Xóa bệnh nhân thành công' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async timKiem(req, res) {
        try {
            const { q } = req.query;
            if (!q || typeof q !== 'string' || !q.trim()) {
                res.status(400).json({ success: false, message: 'Tham số q bắt buộc để tìm kiếm bệnh nhân' });
                return;
            }
            const data = await this.service.timKiem(q);
            res.json({ success: true, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
}
exports.BenhNhanController = BenhNhanController;
//# sourceMappingURL=BenhNhanController.js.map