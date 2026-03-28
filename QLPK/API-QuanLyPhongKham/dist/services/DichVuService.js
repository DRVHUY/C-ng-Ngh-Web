"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LichHenService = void 0;
const LichHenRepository_1 = require("../repositories/LichHenRepository");
class LichHenService {
    constructor() {
        this.repository = new LichHenRepository_1.LichHenRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maLichHen) {
        return this.repository.getById(maLichHen);
    }
    async layTheoBenhNhan(maBenhNhan) {
        return this.repository.getByBenhNhan(maBenhNhan);
    }
    async taoMoi(lichHen) {
        return this.repository.create(lichHen);
    }
    async capNhat(maLichHen, lichHen) {
        const existing = await this.repository.getById(maLichHen);
        if (!existing) {
            throw new Error('Lịch hẹn không tồn tại');
        }
        return this.repository.update(maLichHen, lichHen);
    }
    async xoa(maLichHen) {
        const existing = await this.repository.getById(maLichHen);
        if (!existing) {
            throw new Error('Lịch hẹn không tồn tại');
        }
        return this.repository.delete(maLichHen);
    }
}
exports.LichHenService = LichHenService;
//# sourceMappingURL=DichVuService.js.map