"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NguoiDungVaiTroRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class NguoiDungVaiTroRepository {
    /**
     * Lấy tất cả vai trò của một người dùng
     */
    async getRolesByUserId(maNguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .query(`SELECT vt.TenVaiTro 
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
         WHERE nvt.MaNguoiDung = @MaNguoiDung`);
        return result.recordset.map(r => r.TenVaiTro);
    }
    /**
     * Lấy vai trò chính của người dùng (vai trò đầu tiên trong danh sách)
     */
    async getPrimaryRoleByUserId(maNguoiDung) {
        const roles = await this.getRolesByUserId(maNguoiDung);
        return roles.length > 0 ? roles[0] : null;
    }
    /**
     * Kiểm tra xem người dùng có vai trò nào không
     */
    async hasRole(maNguoiDung, tenVaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .input('TenVaiTro', mssql_1.default.NVarChar, tenVaiTro)
            .query(`SELECT COUNT(*) as count
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
         WHERE nvt.MaNguoiDung = @MaNguoiDung AND vt.TenVaiTro = @TenVaiTro`);
        return result.recordset[0].count > 0;
    }
    /**
     * Gán vai trò cho người dùng
     */
    async assignRole(maNguoiDung, maVaiTro) {
        const pool = (0, database_1.getPool)();
        // Kiểm tra xem vai trò đã được gán chưa
        const existing = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .input('MaVaiTro', mssql_1.default.Int, maVaiTro)
            .query(`SELECT * FROM NguoiDungVaiTro 
         WHERE MaNguoiDung = @MaNguoiDung AND MaVaiTro = @MaVaiTro`);
        if (existing.recordset.length > 0) {
            return existing.recordset[0];
        }
        // Thêm vai trò mới
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .input('MaVaiTro', mssql_1.default.Int, maVaiTro)
            .query(`INSERT INTO NguoiDungVaiTro (MaNguoiDung, MaVaiTro) 
         OUTPUT INSERTED.* 
         VALUES (@MaNguoiDung, @MaVaiTro)`);
        return result.recordset[0];
    }
    /**
     * Gỡ bỏ tất cả vai trò của người dùng
     */
    async revokeAllRoles(maNguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .query('DELETE FROM NguoiDungVaiTro WHERE MaNguoiDung = @MaNguoiDung');
        return result.rowsAffected[0] > 0;
    }
    /**
     * Lấy tất cả người dùng có vai trò nào đó
     */
    async getUsersByRole(tenVaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenVaiTro', mssql_1.default.NVarChar, tenVaiTro)
            .query(`SELECT nvt.MaNguoiDung
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
         WHERE vt.TenVaiTro = @TenVaiTro`);
        return result.recordset.map(r => r.MaNguoiDung);
    }
    /**
     * Lấy tất cả vai trò với chi tiết
     */
    async getAllWithDetails() {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .query(`SELECT nvt.MaNguoiDung, nvt.MaVaiTro, vt.TenVaiTro
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro`);
        return result.recordset;
    }
}
exports.NguoiDungVaiTroRepository = NguoiDungVaiTroRepository;
//# sourceMappingURL=NguoiDungVaiTroRepository.js.map