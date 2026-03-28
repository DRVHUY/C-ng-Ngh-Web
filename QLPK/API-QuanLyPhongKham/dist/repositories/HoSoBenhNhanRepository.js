"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoSoBenhNhanRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class HoSoBenhNhanRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM HoSoBenhNhan');
        return result.recordset;
    }
    async getById(maHoSo) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoSo', mssql_1.default.Int, maHoSo)
            .query('SELECT * FROM HoSoBenhNhan WHERE MaHoSo = @MaHoSo');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByBenhNhan(maBenhNhan) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBenhNhan', mssql_1.default.Int, maBenhNhan)
            .query('SELECT * FROM HoSoBenhNhan WHERE MaBenhNhan = @MaBenhNhan');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(hoSo) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBenhNhan', mssql_1.default.Int, hoSo.MaBenhNhan)
            .input('TienSuBenh', mssql_1.default.NVarChar, hoSo.TienSuBenh)
            .input('DiUngThuoc', mssql_1.default.NVarChar, hoSo.DiUngThuoc)
            .input('GhiChu', mssql_1.default.NVarChar, hoSo.GhiChu)
            .query(`INSERT INTO HoSoBenhNhan (MaBenhNhan, TienSuBenh, DiUngThuoc, GhiChu) 
        OUTPUT INSERTED.* 
        VALUES (@MaBenhNhan, @TienSuBenh, @DiUngThuoc, @GhiChu)`);
        return result.recordset[0];
    }
    async update(maHoSo, hoSo) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE HoSoBenhNhan SET ';
        const fields = [];
        const request = pool.request().input('MaHoSo', mssql_1.default.Int, maHoSo);
        if (hoSo.TienSuBenh) {
            fields.push('TienSuBenh = @TienSuBenh');
            request.input('TienSuBenh', mssql_1.default.NVarChar, hoSo.TienSuBenh);
        }
        if (hoSo.DiUngThuoc) {
            fields.push('DiUngThuoc = @DiUngThuoc');
            request.input('DiUngThuoc', mssql_1.default.NVarChar, hoSo.DiUngThuoc);
        }
        if (hoSo.GhiChu) {
            fields.push('GhiChu = @GhiChu');
            request.input('GhiChu', mssql_1.default.NVarChar, hoSo.GhiChu);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaHoSo = @MaHoSo';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maHoSo) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoSo', mssql_1.default.Int, maHoSo)
            .query('DELETE FROM HoSoBenhNhan WHERE MaHoSo = @MaHoSo');
        return result.rowsAffected[0] > 0;
    }
}
exports.HoSoBenhNhanRepository = HoSoBenhNhanRepository;
//# sourceMappingURL=HoSoBenhNhanRepository.js.map