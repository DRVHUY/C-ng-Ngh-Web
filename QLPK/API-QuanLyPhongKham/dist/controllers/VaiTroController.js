"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaiTroController = void 0;
const VaiTroService_1 = require("../services/VaiTroService");
class VaiTroController {
    constructor() {
        this.service = new VaiTroService_1.VaiTroService();
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
                res.status(404).json({ success: false, message: 'Vai trò không tồn tại' });
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
            const { TenVaiTro } = req.body;
            if (!TenVaiTro) {
                res.status(400).json({ success: false, message: 'Tên vai trò là bắt buộc' });
                return;
            }
            const data = await this.service.taoMoi({ TenVaiTro });
            res.status(201).json({ success: true, message: 'Tạo vai trò thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async capNhat(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.capNhat(parseInt(id), req.body);
            res.json({ success: true, message: 'Cập nhật vai trò thành công', data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
    async xoa(req, res) {
        try {
            const { id } = req.params;
            await this.service.xoa(parseInt(id));
            res.json({ success: true, message: 'Xóa vai trò thành công' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
        }
    }
}
exports.VaiTroController = VaiTroController;
//# sourceMappingURL=VaiTroController.js.map