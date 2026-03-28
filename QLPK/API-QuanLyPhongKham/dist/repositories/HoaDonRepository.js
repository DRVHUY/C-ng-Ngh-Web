"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoaDonRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class HoaDonRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM HoaDon');
        return result.recordset;
    }
    async getById(maHoaDon) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoaDon', mssql_1.default.Int, maHoaDon)
            .query('SELECT * FROM HoaDon WHERE MaHoaDon = @MaHoaDon');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(hoaDon) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaLichHen', mssql_1.default.Int, hoaDon.MaLichHen)
            .input('TongTien', mssql_1.default.Decimal(18, 2), hoaDon.TongTien)
            .input('TrangThai', mssql_1.default.NVarChar, hoaDon.TrangThai)
            .input('NgayThanhToan', mssql_1.default.DateTime, hoaDon.NgayThanhToan || null)
            .query(`INSERT INTO HoaDon (MaLichHen, TongTien, TrangThai, NgayThanhToan) 
        OUTPUT INSERTED.* 
        VALUES (@MaLichHen, @TongTien, @TrangThai, @NgayThanhToan)`);
        return result.recordset[0];
    }
    async update(maHoaDon, hoaDon) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE HoaDon SET ';
        const fields = [];
        const request = pool.request().input('MaHoaDon', mssql_1.default.Int, maHoaDon);
        if (hoaDon.TongTien) {
            fields.push('TongTien = @TongTien');
            request.input('TongTien', mssql_1.default.Decimal(18, 2), hoaDon.TongTien);
        }
        if (hoaDon.TrangThai) {
            fields.push('TrangThai = @TrangThai');
            request.input('TrangThai', mssql_1.default.NVarChar, hoaDon.TrangThai);
        }
        if (hoaDon.NgayThanhToan) {
            fields.push('NgayThanhToan = @NgayThanhToan');
            request.input('NgayThanhToan', mssql_1.default.DateTime, hoaDon.NgayThanhToan);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaHoaDon = @MaHoaDon';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maHoaDon) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaHoaDon', mssql_1.default.Int, maHoaDon)
            .query('DELETE FROM HoaDon WHERE MaHoaDon = @MaHoaDon');
        return result.rowsAffected[0] > 0;
    }
}
exports.HoaDonRepository = HoaDonRepository;
//# sourceMappingURL=HoaDonRepository.js.map