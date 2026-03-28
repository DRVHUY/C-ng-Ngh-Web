"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiTietDonThuocService = exports.ChiTietPhieuNhapService = exports.PhieuNhapThuocService = exports.TonKhoService = exports.ThuocService = exports.DanhMucThuocService = void 0;
const ThuocRepository_1 = require("../repositories/ThuocRepository");
class DanhMucThuocService {
    constructor() {
        this.repository = new ThuocRepository_1.DanhMucThuocRepository();
    }
    async layTatCa() { return this.repository.getAll(); }
    async layTheoId(id) { return this.repository.getById(id); }
    async taoMoi(data) { return this.repository.create(data); }
    async capNhat(id, data) { return this.repository.update(id, data); }
    async xoa(id) { return this.repository.delete(id); }
}
exports.DanhMucThuocService = DanhMucThuocService;
class ThuocService {
    constructor() {
        this.repository = new ThuocRepository_1.ThuocRepository();
    }
    async layTatCa() { return this.repository.getAll(); }
    async layTheoId(id) { return this.repository.getById(id); }
    async layTheoDanhMuc(maDanhMuc) { return this.repository.getByDanhMuc(maDanhMuc); }
    async taoMoi(data) { return this.repository.create(data); }
    async capNhat(id, data) { return this.repository.update(id, data); }
    async xoa(id) { return this.repository.delete(id); }
}
exports.ThuocService = ThuocService;
class TonKhoService {
    constructor() {
        this.repository = new ThuocRepository_1.TonKhoRepository();
    }
    async layTatCa() { return this.repository.getAll(); }
    async layTheoId(id) { return this.repository.getById(id); }
    async layTheoThuoc(maThuoc) { return this.repository.getByThuoc(maThuoc); }
    async capNhat(id, data) { return this.repository.update(id, data); }
}
exports.TonKhoService = TonKhoService;
class PhieuNhapThuocService {
    constructor() {
        this.repository = new ThuocRepository_1.PhieuNhapThuocRepository();
    }
    async layTatCa() { return this.repository.getAll(); }
    async layTheoId(id) { return this.repository.getById(id); }
    async taoMoi(data) { return this.repository.create(data); }
    async capNhat(id, data) { return this.repository.update(id, data); }
    async xoa(id) { return this.repository.delete(id); }
}
exports.PhieuNhapThuocService = PhieuNhapThuocService;
class ChiTietPhieuNhapService {
    constructor() {
        this.repository = new ThuocRepository_1.ChiTietPhieuNhapRepository();
    }
    async layTatCa() { return this.repository.getAll(); }
    async layTheoPhieu(maPhieuNhap) { return this.repository.getByPhieuNhap(maPhieuNhap); }
    async layTheoId(id) { return this.repository.getById(id); }
    async taoMoi(data) { return this.repository.create(data); }
}
exports.ChiTietPhieuNhapService = ChiTietPhieuNhapService;
class ChiTietDonThuocService {
    constructor() {
        this.repository = new ThuocRepository_1.ChiTietDonThuocRepository();
    }
    async layTatCa() { return this.repository.getAll(); }
    async layTheoDon(maDonThuoc) { return this.repository.getByDonThuoc(maDonThuoc); }
    async layTheoId(id) { return this.repository.getById(id); }
    async taoMoi(data) { return this.repository.create(data); }
}
exports.ChiTietDonThuocService = ChiTietDonThuocService;
//# sourceMappingURL=ThuocService.js.map