"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoSoKhamBenhRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class HoSoKhamBenhRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM HoSoKhamBenh');
        return result.recordset;
    }
    async getById(maHoSoKham) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoSoKham', mssql_1.default.Int, maHoSoKham)
            .query('SELECT * FROM HoSoKhamBenh WHERE MaHoSoKham = @MaHoSoKham');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByLichHen(maLichHen) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaLichHen', mssql_1.default.Int, maLichHen)
            .query('SELECT * FROM HoSoKhamBenh WHERE MaLichHen = @MaLichHen');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(hoSoKham) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaLichHen', mssql_1.default.Int, hoSoKham.MaLichHen)
            .input('TrieuChung', mssql_1.default.NVarChar, hoSoKham.TrieuChung)
            .input('ChanDoan', mssql_1.default.NVarChar, hoSoKham.ChanDoan)
            .input('GhiChu', mssql_1.default.NVarChar, hoSoKham.GhiChu)
            .query(`INSERT INTO HoSoKhamBenh (MaLichHen, TrieuChung, ChanDoan, GhiChu) 
        OUTPUT INSERTED.* 
        VALUES (@MaLichHen, @TrieuChung, @ChanDoan, @GhiChu)`);
        return result.recordset[0];
    }
    async update(maHoSoKham, hoSoKham) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE HoSoKhamBenh SET ';
        const fields = [];
        const request = pool.request().input('MaHoSoKham', mssql_1.default.Int, maHoSoKham);
        if (hoSoKham.TrieuChung) {
            fields.push('TrieuChung = @TrieuChung');
            request.input('TrieuChung', mssql_1.default.NVarChar, hoSoKham.TrieuChung);
        }
        if (hoSoKham.ChanDoan) {
            fields.push('ChanDoan = @ChanDoan');
            request.input('ChanDoan', mssql_1.default.NVarChar, hoSoKham.ChanDoan);
        }
        if (hoSoKham.GhiChu) {
            fields.push('GhiChu = @GhiChu');
            request.input('GhiChu', mssql_1.default.NVarChar, hoSoKham.GhiChu);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaHoSoKham = @MaHoSoKham';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maHoSoKham) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoSoKham', mssql_1.default.Int, maHoSoKham)
            .query('DELETE FROM HoSoKhamBenh WHERE MaHoSoKham = @MaHoSoKham');
        return result.rowsAffected[0] > 0;
    }
}
exports.HoSoKhamBenhRepository = HoSoKhamBenhRepository;
//# sourceMappingURL=HoSoKhamBenhRepository.js.map