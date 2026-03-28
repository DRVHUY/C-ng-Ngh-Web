"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonThuocRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class DonThuocRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM DonThuoc');
        return result.recordset;
    }
    async getById(maDonThuoc) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaDonThuoc', mssql_1.default.Int, maDonThuoc)
            .query('SELECT * FROM DonThuoc WHERE MaDonThuoc = @MaDonThuoc');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByHoSoKham(maHoSoKham) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoSoKham', mssql_1.default.Int, maHoSoKham)
            .query('SELECT * FROM DonThuoc WHERE MaHoSoKham = @MaHoSoKham');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(donThuoc) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoSoKham', mssql_1.default.Int, donThuoc.MaHoSoKham)
            .query(`INSERT INTO DonThuoc (MaHoSoKham) 
        OUTPUT INSERTED.* 
        VALUES (@MaHoSoKham)`);
        return result.recordset[0];
    }
    async delete(maDonThuoc) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaDonThuoc', mssql_1.default.Int, maDonThuoc)
            .query('DELETE FROM DonThuoc WHERE MaDonThuoc = @MaDonThuoc');
        return result.rowsAffected[0] > 0;
    }
}
exports.DonThuocRepository = DonThuocRepository;
//# sourceMappingURL=DonThuocRepository.js.map