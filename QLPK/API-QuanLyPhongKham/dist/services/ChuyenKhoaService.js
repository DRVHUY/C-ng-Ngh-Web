"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChuyenKhoaService = void 0;
const ChuyenKhoaRepository_1 = require("../repositories/ChuyenKhoaRepository");
class ChuyenKhoaService {
    constructor() {
        this.repository = new ChuyenKhoaRepository_1.ChuyenKhoaRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maChuyenKhoa) {
        return this.repository.getById(maChuyenKhoa);
    }
    async taoMoi(chuyenKhoa) {
        return this.repository.create(chuyenKhoa);
    }
    async capNhat(maChuyenKhoa, chuyenKhoa) {
        const existing = await this.repository.getById(maChuyenKhoa);
        if (!existing) {
            throw new Error('Chuyên khoa không tồn tại');
        }
        return this.repository.update(maChuyenKhoa, chuyenKhoa);
    }
    async xoa(maChuyenKhoa) {
        const existing = await this.repository.getById(maChuyenKhoa);
        if (!existing) {
            throw new Error('Chuyên khoa không tồn tại');
        }
        return this.repository.delete(maChuyenKhoa);
    }
}
exports.ChuyenKhoaService = ChuyenKhoaService;
//# sourceMappingURL=ChuyenKhoaService.js.map