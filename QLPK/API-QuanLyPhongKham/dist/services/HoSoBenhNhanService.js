"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoSoBenhNhanService = void 0;
const HoSoBenhNhanRepository_1 = require("../repositories/HoSoBenhNhanRepository");
class HoSoBenhNhanService {
    constructor() {
        this.repository = new HoSoBenhNhanRepository_1.HoSoBenhNhanRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maHoSo) {
        return this.repository.getById(maHoSo);
    }
    async layTheoBenhNhan(maBenhNhan) {
        return this.repository.getByBenhNhan(maBenhNhan);
    }
    async taoMoi(hoSo) {
        return this.repository.create(hoSo);
    }
    async capNhat(maHoSo, hoSo) {
        const existing = await this.repository.getById(maHoSo);
        if (!existing) {
            throw new Error('Hồ sơ bệnh nhân không tồn tại');
        }
        return this.repository.update(maHoSo, hoSo);
    }
    async xoa(maHoSo) {
        const existing = await this.repository.getById(maHoSo);
        if (!existing) {
            throw new Error('Hồ sơ bệnh nhân không tồn tại');
        }
        return this.repository.delete(maHoSo);
    }
}
exports.HoSoBenhNhanService = HoSoBenhNhanService;
//# sourceMappingURL=HoSoBenhNhanService.js.map