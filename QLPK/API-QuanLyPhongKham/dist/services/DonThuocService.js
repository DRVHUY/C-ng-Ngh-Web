"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonThuocService = void 0;
const DonThuocRepository_1 = require("../repositories/DonThuocRepository");
class DonThuocService {
    constructor() {
        this.repository = new DonThuocRepository_1.DonThuocRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maDonThuoc) {
        return this.repository.getById(maDonThuoc);
    }
    async layTheoHoSoKham(maHoSoKham) {
        return this.repository.getByHoSoKham(maHoSoKham);
    }
    async taoMoi(donThuoc) {
        return this.repository.create(donThuoc);
    }
    async xoa(maDonThuoc) {
        const existing = await this.repository.getById(maDonThuoc);
        if (!existing) {
            throw new Error('Đơn thuốc không tồn tại');
        }
        return this.repository.delete(maDonThuoc);
    }
}
exports.DonThuocService = DonThuocService;
//# sourceMappingURL=DonThuocService.js.map