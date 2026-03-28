"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoaDonService = void 0;
const HoaDonRepository_1 = require("../repositories/HoaDonRepository");
class HoaDonService {
    constructor() {
        this.repository = new HoaDonRepository_1.HoaDonRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maHoaDon) {
        return this.repository.getById(maHoaDon);
    }
    async taoMoi(hoaDon) {
        return this.repository.create(hoaDon);
    }
    async capNhat(maHoaDon, hoaDon) {
        const existing = await this.repository.getById(maHoaDon);
        if (!existing) {
            throw new Error('Hóa đơn không tồn tại');
        }
        return this.repository.update(maHoaDon, hoaDon);
    }
    async xoa(maHoaDon) {
        const existing = await this.repository.getById(maHoaDon);
        if (!existing) {
            throw new Error('Hóa đơn không tồn tại');
        }
        return this.repository.delete(maHoaDon);
    }
}
exports.HoaDonService = HoaDonService;
//# sourceMappingURL=HoaDonService.js.map