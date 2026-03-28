"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaiTroRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class VaiTroRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM VaiTro');
        return result.recordset;
    }
    async getById(maVaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaVaiTro', mssql_1.default.Int, maVaiTro)
            .query('SELECT * FROM VaiTro WHERE MaVaiTro = @MaVaiTro');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByTenVaiTro(tenVaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenVaiTro', mssql_1.default.NVarChar, tenVaiTro)
            .query('SELECT * FROM VaiTro WHERE TenVaiTro = @TenVaiTro');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(vaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenVaiTro', mssql_1.default.NVarChar, vaiTro.TenVaiTro)
            .query(`INSERT INTO VaiTro (TenVaiTro) 
        OUTPUT INSERTED.* 
        VALUES (@TenVaiTro)`);
        return result.recordset[0];
    }
    async update(maVaiTro, vaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaVaiTro', mssql_1.default.Int, maVaiTro)
            .input('TenVaiTro', mssql_1.default.NVarChar, vaiTro.TenVaiTro)
            .query('UPDATE VaiTro SET TenVaiTro = @TenVaiTro OUTPUT INSERTED.* WHERE MaVaiTro = @MaVaiTro');
        return result.recordset[0];
    }
    async delete(maVaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaVaiTro', mssql_1.default.Int, maVaiTro)
            .query('DELETE FROM VaiTro WHERE MaVaiTro = @MaVaiTro');
        return result.rowsAffected[0] > 0;
    }
}
exports.VaiTroRepository = VaiTroRepository;
//# sourceMappingURL=VaiTroRepository.js.map