"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaiTroService = void 0;
const VaiTroRepository_1 = require("../repositories/VaiTroRepository");
class VaiTroService {
    constructor() {
        this.repository = new VaiTroRepository_1.VaiTroRepository();
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maVaiTro) {
        return this.repository.getById(maVaiTro);
    }
    async layTheoTen(tenVaiTro) {
        return this.repository.getByTenVaiTro(tenVaiTro);
    }
    async taoMoi(vaiTro) {
        const existing = await this.repository.getByTenVaiTro(vaiTro.TenVaiTro);
        if (existing) {
            throw new Error('Vai trò này đã tồn tại');
        }
        return this.repository.create(vaiTro);
    }
    async capNhat(maVaiTro, vaiTro) {
        const existing = await this.repository.getById(maVaiTro);
        if (!existing) {
            throw new Error('Vai trò không tồn tại');
        }
        return this.repository.update(maVaiTro, vaiTro);
    }
    async xoa(maVaiTro) {
        const existing = await this.repository.getById(maVaiTro);
        if (!existing) {
            throw new Error('Vai trò không tồn tại');
        }
        return this.repository.delete(maVaiTro);
    }
}
exports.VaiTroService = VaiTroService;
//# sourceMappingURL=VaiTroService.js.map