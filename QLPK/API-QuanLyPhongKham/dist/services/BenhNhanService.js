"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenhNhanService = void 0;
const BenhNhanRepository_1 = require("../repositories/BenhNhanRepository");
class BenhNhanService {
    constructor() {
        this.repository = new BenhNhanRepository_1.BenhNhanRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maBenhNhan) {
        return this.repository.getById(maBenhNhan);
    }
    async layTheoMaNguoiDung(maNguoiDung) {
        return this.repository.getByMaNguoiDung(maNguoiDung);
    }
    async timKiem(ten) {
        if (!ten || ten.trim() === '') {
            return [];
        }
        return this.repository.searchByName(ten.trim());
    }
    async taoMoi(benhNhan) {
        return this.repository.create(benhNhan);
    }
    async capNhat(maBenhNhan, benhNhan) {
        const existing = await this.repository.getById(maBenhNhan);
        if (!existing) {
            throw new Error('Bệnh nhân không tồn tại');
        }
        return this.repository.update(maBenhNhan, benhNhan);
    }
    async xoa(maBenhNhan) {
        const existing = await this.repository.getById(maBenhNhan);
        if (!existing) {
            throw new Error('Bệnh nhân không tồn tại');
        }
        return this.repository.delete(maBenhNhan);
    }
}
exports.BenhNhanService = BenhNhanService;
//# sourceMappingURL=BenhNhanService.js.map