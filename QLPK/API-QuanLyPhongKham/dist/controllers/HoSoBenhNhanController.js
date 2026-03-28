"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoSoBenhNhanController = void 0;
const HoSoBenhNhanService_1 = require("../services/HoSoBenhNhanService");
class HoSoBenhNhanController {
    constructor() {
        this.service = new HoSoBenhNhanService_1.HoSoBenhNhanService();
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
                res.status(404).json({ success: false, message: 'Hồ sơ bệnh nhân không tồn tại' });
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
            const { MaBenhNhan, TienSuBenh, DiUngThuoc, GhiChu } = req.body;
            if (!MaBenhNhan) {
                res.status(400).json({ success: false, message: 'Mã bệnh nhân là bắt buộc' });
                return;
            }
            const data = await this.service.taoMoi({
                MaBenhNhan,
                TienSuBenh,
                DiUngThuoc,
                GhiChu,
            });
            res.status(201).json({ success: true, message: 'Tạo hồ sơ bệnh nhân thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async capNhat(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.capNhat(parseInt(id), req.body);
            res.json({ success: true, message: 'Cập nhật hồ sơ bệnh nhân thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async xoa(req, res) {
        try {
            const { id } = req.params;
            await this.service.xoa(parseInt(id));
            res.json({ success: true, message: 'Xóa hồ sơ bệnh nhân thành công' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
}
exports.HoSoBenhNhanController = HoSoBenhNhanController;
//# sourceMappingURL=HoSoBenhNhanController.js.map