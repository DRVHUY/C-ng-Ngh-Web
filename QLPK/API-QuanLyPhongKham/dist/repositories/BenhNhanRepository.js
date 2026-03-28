"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenhNhanRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class BenhNhanRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM BenhNhan');
        return result.recordset;
    }
    async getById(maBenhNhan) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBenhNhan', mssql_1.default.Int, maBenhNhan)
            .query('SELECT * FROM BenhNhan WHERE MaBenhNhan = @MaBenhNhan');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByMaNguoiDung(maNguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .query('SELECT * FROM BenhNhan WHERE MaNguoiDung = @MaNguoiDung');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(benhNhan) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, benhNhan.MaNguoiDung)
            .input('NgaySinh', mssql_1.default.Date, benhNhan.NgaySinh)
            .input('GioiTinh', mssql_1.default.NVarChar, benhNhan.GioiTinh)
            .input('DiaChi', mssql_1.default.NVarChar, benhNhan.DiaChi)
            .query(`INSERT INTO BenhNhan (MaNguoiDung, NgaySinh, GioiTinh, DiaChi) 
        OUTPUT INSERTED.* 
        VALUES (@MaNguoiDung, @NgaySinh, @GioiTinh, @DiaChi)`);
        return result.recordset[0];
    }
    async update(maBenhNhan, benhNhan) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE BenhNhan SET ';
        const fields = [];
        const request = pool.request().input('MaBenhNhan', mssql_1.default.Int, maBenhNhan);
        if (benhNhan.NgaySinh) {
            fields.push('NgaySinh = @NgaySinh');
            request.input('NgaySinh', mssql_1.default.Date, benhNhan.NgaySinh);
        }
        if (benhNhan.GioiTinh) {
            fields.push('GioiTinh = @GioiTinh');
            request.input('GioiTinh', mssql_1.default.NVarChar, benhNhan.GioiTinh);
        }
        if (benhNhan.DiaChi) {
            fields.push('DiaChi = @DiaChi');
            request.input('DiaChi', mssql_1.default.NVarChar, benhNhan.DiaChi);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaBenhNhan = @MaBenhNhan';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maBenhNhan) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBenhNhan', mssql_1.default.Int, maBenhNhan)
            .query('DELETE FROM BenhNhan WHERE MaBenhNhan = @MaBenhNhan');
        return result.rowsAffected[0] > 0;
    }
    async searchByName(keyword) {
        const pool = (0, database_1.getPool)();
        const pattern = `%${keyword}%`;
        const result = await pool
            .request()
            .input('Keyword', mssql_1.default.NVarChar, pattern)
            .query(`SELECT bn.*, nd.HoTen, nd.TenDangNhap FROM BenhNhan bn
         JOIN NguoiDung nd ON bn.MaNguoiDung = nd.MaNguoiDung
         WHERE nd.HoTen LIKE @Keyword OR nd.TenDangNhap LIKE @Keyword`);
        return result.recordset;
    }
}
exports.BenhNhanRepository = BenhNhanRepository;
//# sourceMappingURL=BenhNhanRepository.js.map