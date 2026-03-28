"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LichHenRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class LichHenRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM LichHen');
        return result.recordset;
    }
    async getById(maLichHen) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaLichHen', mssql_1.default.Int, maLichHen)
            .query('SELECT * FROM LichHen WHERE MaLichHen = @MaLichHen');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByBenhNhan(maBenhNhan) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBenhNhan', mssql_1.default.Int, maBenhNhan)
            .query('SELECT * FROM LichHen WHERE MaBenhNhan = @MaBenhNhan');
        return result.recordset;
    }
    async create(lichHen) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBenhNhan', mssql_1.default.Int, lichHen.MaBenhNhan)
            .input('MaBacSi', mssql_1.default.Int, lichHen.MaBacSi)
            .input('MaLich', mssql_1.default.Int, lichHen.MaLich)
            .input('ThoiGianHen', mssql_1.default.DateTime, lichHen.ThoiGianHen)
            .input('TrangThai', mssql_1.default.NVarChar, lichHen.TrangThai)
            .query(`INSERT INTO LichHen (MaBenhNhan, MaBacSi, MaLich, ThoiGianHen, TrangThai) 
        OUTPUT INSERTED.* 
        VALUES (@MaBenhNhan, @MaBacSi, @MaLich, @ThoiGianHen, @TrangThai)`);
        return result.recordset[0];
    }
    async update(maLichHen, lichHen) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE LichHen SET ';
        const fields = [];
        const request = pool.request().input('MaLichHen', mssql_1.default.Int, maLichHen);
        if (lichHen.TrangThai) {
            fields.push('TrangThai = @TrangThai');
            request.input('TrangThai', mssql_1.default.NVarChar, lichHen.TrangThai);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaLichHen = @MaLichHen';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maLichHen) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaLichHen', mssql_1.default.Int, maLichHen)
            .query('DELETE FROM LichHen WHERE MaLichHen = @MaLichHen');
        return result.rowsAffected[0] > 0;
    }
}
exports.LichHenRepository = LichHenRepository;
//# sourceMappingURL=LichHenRepository.js.map