"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonThuocController = void 0;
const DonThuocService_1 = require("../services/DonThuocService");
class DonThuocController {
    constructor() {
        this.service = new DonThuocService_1.DonThuocService();
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
                res.status(404).json({ success: false, message: 'Đơn thuốc không tồn tại' });
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
            const { MaHoSoKham } = req.body;
            if (!MaHoSoKham) {
                res.status(400).json({ success: false, message: 'Mã hồ sơ khám là bắt buộc' });
                return;
            }
            const data = await this.service.taoMoi({ MaHoSoKham });
            res.status(201).json({ success: true, message: 'Tạo đơn thuốc thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async xoa(req, res) {
        try {
            const { id } = req.params;
            await this.service.xoa(parseInt(id));
            res.json({ success: true, message: 'Xóa đơn thuốc thành công' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
}
exports.DonThuocController = DonThuocController;
//# sourceMappingURL=DonThuocController.js.map