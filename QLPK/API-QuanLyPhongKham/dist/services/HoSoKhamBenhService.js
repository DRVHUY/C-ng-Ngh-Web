"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoSoKhamBenhService = void 0;
const HoSoKhamBenhRepository_1 = require("../repositories/HoSoKhamBenhRepository");
class HoSoKhamBenhService {
    constructor() {
        this.repository = new HoSoKhamBenhRepository_1.HoSoKhamBenhRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maHoSoKham) {
        return this.repository.getById(maHoSoKham);
    }
    async layTheoLichHen(maLichHen) {
        return this.repository.getByLichHen(maLichHen);
    }
    async taoMoi(hoSoKham) {
        return this.repository.create(hoSoKham);
    }
    async capNhat(maHoSoKham, hoSoKham) {
        const existing = await this.repository.getById(maHoSoKham);
        if (!existing) {
            throw new Error('Hồ sơ khám bệnh không tồn tại');
        }
        return this.repository.update(maHoSoKham, hoSoKham);
    }
    async xoa(maHoSoKham) {
        const existing = await this.repository.getById(maHoSoKham);
        if (!existing) {
            throw new Error('Hồ sơ khám bệnh không tồn tại');
        }
        return this.repository.delete(maHoSoKham);
    }
}
exports.HoSoKhamBenhService = HoSoKhamBenhService;
//# sourceMappingURL=HoSoKhamBenhService.js.map