"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChuyenKhoaRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class ChuyenKhoaRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM ChuyenKhoa');
        return result.recordset;
    }
    async getById(maChuyenKhoa) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaChuyenKhoa', mssql_1.default.Int, maChuyenKhoa)
            .query('SELECT * FROM ChuyenKhoa WHERE MaChuyenKhoa = @MaChuyenKhoa');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(chuyenKhoa) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenChuyenKhoa', mssql_1.default.NVarChar, chuyenKhoa.TenChuyenKhoa)
            .input('MoTa', mssql_1.default.NVarChar, chuyenKhoa.MoTa)
            .query(`INSERT INTO ChuyenKhoa (TenChuyenKhoa, MoTa) 
        OUTPUT INSERTED.* 
        VALUES (@TenChuyenKhoa, @MoTa)`);
        return result.recordset[0];
    }
    async update(maChuyenKhoa, chuyenKhoa) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE ChuyenKhoa SET ';
        const fields = [];
        const request = pool.request().input('MaChuyenKhoa', mssql_1.default.Int, maChuyenKhoa);
        if (chuyenKhoa.TenChuyenKhoa) {
            fields.push('TenChuyenKhoa = @TenChuyenKhoa');
            request.input('TenChuyenKhoa', mssql_1.default.NVarChar, chuyenKhoa.TenChuyenKhoa);
        }
        if (chuyenKhoa.MoTa) {
            fields.push('MoTa = @MoTa');
            request.input('MoTa', mssql_1.default.NVarChar, chuyenKhoa.MoTa);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaChuyenKhoa = @MaChuyenKhoa';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maChuyenKhoa) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaChuyenKhoa', mssql_1.default.Int, maChuyenKhoa)
            .query('DELETE FROM ChuyenKhoa WHERE MaChuyenKhoa = @MaChuyenKhoa');
        return result.rowsAffected[0] > 0;
    }
}
exports.ChuyenKhoaRepository = ChuyenKhoaRepository;
//# sourceMappingURL=ChuyenKhoaRepository.js.map