"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiTietDonThuocRepository = exports.ChiTietPhieuNhapRepository = exports.PhieuNhapThuocRepository = exports.TonKhoRepository = exports.ThuocRepository = exports.DanhMucThuocRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class DanhMucThuocRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM DanhMucThuoc');
        return result.recordset;
    }
    async getById(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaDanhMuc', mssql_1.default.Int, id)
            .query('SELECT * FROM DanhMucThuoc WHERE MaDanhMuc = @MaDanhMuc');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(danhMuc) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('TenDanhMuc', mssql_1.default.NVarChar, danhMuc.TenDanhMuc)
            .query('INSERT INTO DanhMucThuoc (TenDanhMuc) OUTPUT INSERTED.* VALUES (@TenDanhMuc)');
        return result.recordset[0];
    }
    async update(id, danhMuc) {
        const pool = (0, database_1.getPool)();
        const request = pool.request().input('MaDanhMuc', mssql_1.default.Int, id);
        const fields = [];
        if (danhMuc.TenDanhMuc) {
            fields.push('TenDanhMuc = @TenDanhMuc');
            request.input('TenDanhMuc', mssql_1.default.NVarChar, danhMuc.TenDanhMuc);
        }
        const query = 'UPDATE DanhMucThuoc SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaDanhMuc = @MaDanhMuc';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaDanhMuc', mssql_1.default.Int, id)
            .query('DELETE FROM DanhMucThuoc WHERE MaDanhMuc = @MaDanhMuc');
        return result.rowsAffected[0] > 0;
    }
}
exports.DanhMucThuocRepository = DanhMucThuocRepository;
class ThuocRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM Thuoc');
        return result.recordset;
    }
    async getById(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaThuoc', mssql_1.default.Int, id)
            .query('SELECT * FROM Thuoc WHERE MaThuoc = @MaThuoc');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByDanhMuc(maDanhMuc) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaDanhMuc', mssql_1.default.Int, maDanhMuc)
            .query('SELECT * FROM Thuoc WHERE MaDanhMuc = @MaDanhMuc');
        return result.recordset;
    }
    async create(thuoc) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('TenThuoc', mssql_1.default.NVarChar, thuoc.TenThuoc)
            .input('DonViTinh', mssql_1.default.NVarChar, thuoc.DonViTinh)
            .input('Gia', mssql_1.default.Decimal(18, 2), thuoc.Gia)
            .input('MaDanhMuc', mssql_1.default.Int, thuoc.MaDanhMuc)
            .query('INSERT INTO Thuoc (TenThuoc, DonViTinh, Gia, MaDanhMuc) OUTPUT INSERTED.* VALUES (@TenThuoc, @DonViTinh, @Gia, @MaDanhMuc)');
        return result.recordset[0];
    }
    async update(id, thuoc) {
        const pool = (0, database_1.getPool)();
        const request = pool.request().input('MaThuoc', mssql_1.default.Int, id);
        const fields = [];
        if (thuoc.TenThuoc) {
            fields.push('TenThuoc = @TenThuoc');
            request.input('TenThuoc', mssql_1.default.NVarChar, thuoc.TenThuoc);
        }
        if (thuoc.DonViTinh) {
            fields.push('DonViTinh = @DonViTinh');
            request.input('DonViTinh', mssql_1.default.NVarChar, thuoc.DonViTinh);
        }
        if (thuoc.Gia !== undefined) {
            fields.push('Gia = @Gia');
            request.input('Gia', mssql_1.default.Decimal(18, 2), thuoc.Gia);
        }
        if (thuoc.MaDanhMuc) {
            fields.push('MaDanhMuc = @MaDanhMuc');
            request.input('MaDanhMuc', mssql_1.default.Int, thuoc.MaDanhMuc);
        }
        const query = 'UPDATE Thuoc SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaThuoc = @MaThuoc';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaThuoc', mssql_1.default.Int, id)
            .query('DELETE FROM Thuoc WHERE MaThuoc = @MaThuoc');
        return result.rowsAffected[0] > 0;
    }
}
exports.ThuocRepository = ThuocRepository;
class TonKhoRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM TonKho');
        return result.recordset;
    }
    async getById(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaTonKho', mssql_1.default.Int, id)
            .query('SELECT * FROM TonKho WHERE MaTonKho = @MaTonKho');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByThuoc(maThuoc) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaThuoc', mssql_1.default.Int, maThuoc)
            .query('SELECT * FROM TonKho WHERE MaThuoc = @MaThuoc');
        return result.recordset;
    }
    async update(id, tonKho) {
        const pool = (0, database_1.getPool)();
        const request = pool.request().input('MaTonKho', mssql_1.default.Int, id);
        const fields = [];
        if (tonKho.MaThuoc) {
            fields.push('MaThuoc = @MaThuoc');
            request.input('MaThuoc', mssql_1.default.Int, tonKho.MaThuoc);
        }
        if (tonKho.SoLuong !== undefined) {
            fields.push('SoLuong = @SoLuong');
            request.input('SoLuong', mssql_1.default.Int, tonKho.SoLuong);
        }
        if (tonKho.MaKho) {
            fields.push('MaKho = @MaKho');
            request.input('MaKho', mssql_1.default.Int, tonKho.MaKho);
        }
        const query = 'UPDATE TonKho SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaTonKho = @MaTonKho';
        const result = await request.query(query);
        return result.recordset[0];
    }
}
exports.TonKhoRepository = TonKhoRepository;
class PhieuNhapThuocRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM PhieuNhapThuoc');
        return result.recordset;
    }
    async getById(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaPhieuNhap', mssql_1.default.Int, id)
            .query('SELECT * FROM PhieuNhapThuoc WHERE MaPhieuNhap = @MaPhieuNhap');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(phieu) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('NgayNhap', mssql_1.default.DateTime, phieu.NgayNhap)
            .input('NhaCungCap', mssql_1.default.NVarChar, phieu.NhaCungCap)
            .input('NguoiNhap', mssql_1.default.NVarChar, phieu.NguoiNhap || '')
            .query('INSERT INTO PhieuNhapThuoc (NgayNhap, NhaCungCap, NguoiNhap) OUTPUT INSERTED.* VALUES (@NgayNhap, @NhaCungCap, @NguoiNhap)');
        return result.recordset[0];
    }
    async update(id, phieu) {
        const pool = (0, database_1.getPool)();
        const request = pool.request().input('MaPhieuNhap', mssql_1.default.Int, id);
        const fields = [];
        if (phieu.NgayNhap) {
            fields.push('NgayNhap = @NgayNhap');
            request.input('NgayNhap', mssql_1.default.DateTime, phieu.NgayNhap);
        }
        if (phieu.NhaCungCap) {
            fields.push('NhaCungCap = @NhaCungCap');
            request.input('NhaCungCap', mssql_1.default.NVarChar, phieu.NhaCungCap);
        }
        if (phieu.NguoiNhap) {
            fields.push('NguoiNhap = @NguoiNhap');
            request.input('NguoiNhap', mssql_1.default.NVarChar, phieu.NguoiNhap);
        }
        const query = 'UPDATE PhieuNhapThuoc SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaPhieuNhap = @MaPhieuNhap';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaPhieuNhap', mssql_1.default.Int, id)
            .query('DELETE FROM PhieuNhapThuoc WHERE MaPhieuNhap = @MaPhieuNhap');
        return result.rowsAffected[0] > 0;
    }
}
exports.PhieuNhapThuocRepository = PhieuNhapThuocRepository;
class ChiTietPhieuNhapRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM ChiTietPhieuNhap');
        return result.recordset;
    }
    async getByPhieuNhap(maPhieuNhap) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaPhieuNhap', mssql_1.default.Int, maPhieuNhap)
            .query('SELECT * FROM ChiTietPhieuNhap WHERE MaPhieuNhap = @MaPhieuNhap');
        return result.recordset;
    }
    async getById(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaChiTiet', mssql_1.default.Int, id)
            .query('SELECT * FROM ChiTietPhieuNhap WHERE MaChiTiet = @MaChiTiet');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(chiTiet) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaPhieuNhap', mssql_1.default.Int, chiTiet.MaPhieuNhap)
            .input('MaThuoc', mssql_1.default.Int, chiTiet.MaThuoc)
            .input('SoLuong', mssql_1.default.Int, chiTiet.SoLuong)
            .input('GiaNhap', mssql_1.default.Decimal(18, 2), chiTiet.GiaNhap)
            .query('INSERT INTO ChiTietPhieuNhap (MaPhieuNhap, MaThuoc, SoLuong, GiaNhap) OUTPUT INSERTED.* VALUES (@MaPhieuNhap, @MaThuoc, @SoLuong, @GiaNhap)');
        return result.recordset[0];
    }
}
exports.ChiTietPhieuNhapRepository = ChiTietPhieuNhapRepository;
class ChiTietDonThuocRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM ChiTietDonThuoc');
        return result.recordset;
    }
    async getByDonThuoc(maDonThuoc) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaDonThuoc', mssql_1.default.Int, maDonThuoc)
            .query('SELECT * FROM ChiTietDonThuoc WHERE MaDonThuoc = @MaDonThuoc');
        return result.recordset;
    }
    async getById(id) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaChiTiet', mssql_1.default.Int, id)
            .query('SELECT * FROM ChiTietDonThuoc WHERE MaChiTiet = @MaChiTiet');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(chiTiet) {
        const pool = (0, database_1.getPool)();
        const result = await pool.request()
            .input('MaDonThuoc', mssql_1.default.Int, chiTiet.MaDonThuoc)
            .input('MaThuoc', mssql_1.default.Int, chiTiet.MaThuoc)
            .input('SoLuong', mssql_1.default.Int, chiTiet.SoLuong)
            .input('CachDung', mssql_1.default.NVarChar, chiTiet.CachDung)
            .query('INSERT INTO ChiTietDonThuoc (MaDonThuoc, MaThuoc, SoLuong, CachDung) OUTPUT INSERTED.* VALUES (@MaDonThuoc, @MaThuoc, @SoLuong, @CachDung)');
        return result.recordset[0];
    }
}
exports.ChiTietDonThuocRepository = ChiTietDonThuocRepository;
//# sourceMappingURL=ThuocRepository.js.map