"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LichHenController = void 0;
const LichHenService_1 = require("../services/LichHenService");
class LichHenController {
    constructor() {
        this.service = new LichHenService_1.LichHenService();
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
                res.status(404).json({ success: false, message: 'Lịch hẹn không tồn tại' });
                return;
            }
            res.json({ success: true, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async layTheoBenhNhan(req, res) {
        try {
            const { maBenhNhan } = req.params;
            const data = await this.service.layTheoBenhNhan(parseInt(maBenhNhan));
            res.json({ success: true, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async taoMoi(req, res) {
        try {
            const { MaBenhNhan, MaBacSi, MaLich, ThoiGianHen, TrangThai } = req.body;
            if (!MaBenhNhan || !MaBacSi || !MaLich) {
                res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
                return;
            }
            const data = await this.service.taoMoi({
                MaBenhNhan,
                MaBacSi,
                MaLich,
                ThoiGianHen,
                TrangThai: TrangThai || 'Chờ xác nhận',
            });
            res.status(201).json({ success: true, message: 'Tạo lịch hẹn thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async capNhat(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.capNhat(parseInt(id), req.body);
            res.json({ success: true, message: 'Cập nhật lịch hẹn thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async xoa(req, res) {
        try {
            const { id } = req.params;
            await this.service.xoa(parseInt(id));
            res.json({ success: true, message: 'Xóa lịch hẹn thành công' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
}
exports.LichHenController = LichHenController;
//# sourceMappingURL=LichHenController.js.map