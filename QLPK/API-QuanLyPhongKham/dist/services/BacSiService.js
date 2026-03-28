"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacSiService = void 0;
const BacSiRepository_1 = require("../repositories/BacSiRepository");
class BacSiService {
    constructor() {
        this.repository = new BacSiRepository_1.BacSiRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maBacSi) {
        return this.repository.getById(maBacSi);
    }
    async layTheoMaNguoiDung(maNguoiDung) {
        return this.repository.getByMaNguoiDung(maNguoiDung);
    }
    async layTheoChuyenKhoa(maChuyenKhoa) {
        return this.repository.getByChuyenKhoa(maChuyenKhoa);
    }
    async timKiem(ten) {
        if (!ten || ten.trim() === '') {
            return [];
        }
        return this.repository.searchByName(ten.trim());
    }
    async taoMoi(bacSi) {
        return this.repository.create(bacSi);
    }
    async capNhat(maBacSi, bacSi) {
        const existing = await this.repository.getById(maBacSi);
        if (!existing) {
            throw new Error('Bác sĩ không tồn tại');
        }
        return this.repository.update(maBacSi, bacSi);
    }
    async xoa(maBacSi) {
        const existing = await this.repository.getById(maBacSi);
        if (!existing) {
            throw new Error('Bác sĩ không tồn tại');
        }
        return this.repository.delete(maBacSi);
    }
}
exports.BacSiService = BacSiService;
//# sourceMappingURL=BacSiService.js.map