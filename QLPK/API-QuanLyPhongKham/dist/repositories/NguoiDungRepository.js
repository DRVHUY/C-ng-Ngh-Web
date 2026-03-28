"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NguoiDungRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class NguoiDungRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query(`
      SELECT nd.*, vt.TenVaiTro as VaiTro
      FROM NguoiDung nd
      LEFT JOIN NguoiDungVaiTro nvt ON nd.MaNguoiDung = nvt.MaNguoiDung
      LEFT JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
      ORDER BY nd.MaNguoiDung
    `);
        return result.recordset;
    }
    async getById(maNguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .query('SELECT * FROM NguoiDung WHERE MaNguoiDung = @MaNguoiDung');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async searchByName(keyword) {
        const pool = (0, database_1.getPool)();
        const pattern = `%${keyword}%`;
        const result = await pool
            .request()
            .input('Keyword', mssql_1.default.NVarChar, pattern)
            .query(`SELECT * FROM NguoiDung WHERE HoTen LIKE @Keyword OR TenDangNhap LIKE @Keyword`);
        return result.recordset;
    }
    async getByTenDangNhap(tenDangNhap) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenDangNhap', mssql_1.default.NVarChar, tenDangNhap)
            .query('SELECT * FROM NguoiDung WHERE TenDangNhap = @TenDangNhap');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(nguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenDangNhap', mssql_1.default.NVarChar, nguoiDung.TenDangNhap)
            .input('MatKhau', mssql_1.default.NVarChar, nguoiDung.MatKhau)
            .input('HoTen', mssql_1.default.NVarChar, nguoiDung.HoTen)
            .input('DienThoai', mssql_1.default.NVarChar, nguoiDung.DienThoai)
            .input('Email', mssql_1.default.NVarChar, nguoiDung.Email)
            .input('TrangThai', mssql_1.default.Bit, nguoiDung.TrangThai)
            .query(`INSERT INTO NguoiDung (TenDangNhap, MatKhau, HoTen, DienThoai, Email, TrangThai) 
        OUTPUT INSERTED.* 
        VALUES (@TenDangNhap, @MatKhau, @HoTen, @DienThoai, @Email, @TrangThai)`);
        return result.recordset[0];
    }
    async update(maNguoiDung, nguoiDung) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE NguoiDung SET ';
        const fields = [];
        const request = pool.request().input('MaNguoiDung', mssql_1.default.Int, maNguoiDung);
        if (nguoiDung.HoTen) {
            fields.push('HoTen = @HoTen');
            request.input('HoTen', mssql_1.default.NVarChar, nguoiDung.HoTen);
        }
        if (nguoiDung.DienThoai) {
            fields.push('DienThoai = @DienThoai');
            request.input('DienThoai', mssql_1.default.NVarChar, nguoiDung.DienThoai);
        }
        if (nguoiDung.Email) {
            fields.push('Email = @Email');
            request.input('Email', mssql_1.default.NVarChar, nguoiDung.Email);
        }
        if (nguoiDung.MatKhau) {
            fields.push('MatKhau = @MatKhau');
            request.input('MatKhau', mssql_1.default.NVarChar, nguoiDung.MatKhau);
        }
        if (typeof nguoiDung.TrangThai !== 'undefined') {
            fields.push('TrangThai = @TrangThai');
            request.input('TrangThai', mssql_1.default.Bit, nguoiDung.TrangThai);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaNguoiDung = @MaNguoiDung';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maNguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .query('DELETE FROM NguoiDung WHERE MaNguoiDung = @MaNguoiDung');
        return result.rowsAffected[0] > 0;
    }
}
exports.NguoiDungRepository = NguoiDungRepository;
//# sourceMappingURL=NguoiDungRepository.js.map