"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacSiRepository = void 0;
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class BacSiRepository {
    async getAll() {
        const pool = (0, database_1.getPool)();
        const result = await pool.request().query('SELECT * FROM BacSi');
        return result.recordset;
    }
    async getById(maBacSi) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBacSi', mssql_1.default.Int, maBacSi)
            .query('SELECT * FROM BacSi WHERE MaBacSi = @MaBacSi');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async getByMaNguoiDung(maNguoiDung) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, maNguoiDung)
            .query('SELECT * FROM BacSi WHERE MaNguoiDung = @MaNguoiDung');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    async create(bacSi) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaNguoiDung', mssql_1.default.Int, bacSi.MaNguoiDung)
            .input('MaChuyenKhoa', mssql_1.default.Int, bacSi.MaChuyenKhoa)
            .input('BangCap', mssql_1.default.NVarChar, bacSi.BangCap)
            .input('SoNamKinhNghiem', mssql_1.default.Int, bacSi.SoNamKinhNghiem)
            .input('MoTa', mssql_1.default.NVarChar, bacSi.MoTa)
            .query(`INSERT INTO BacSi (MaNguoiDung, MaChuyenKhoa, BangCap, SoNamKinhNghiem, MoTa) 
        OUTPUT INSERTED.* 
        VALUES (@MaNguoiDung, @MaChuyenKhoa, @BangCap, @SoNamKinhNghiem, @MoTa)`);
        return result.recordset[0];
    }
    async update(maBacSi, bacSi) {
        const pool = (0, database_1.getPool)();
        let query = 'UPDATE BacSi SET ';
        const fields = [];
        const request = pool.request().input('MaBacSi', mssql_1.default.Int, maBacSi);
        if (bacSi.MaChuyenKhoa) {
            fields.push('MaChuyenKhoa = @MaChuyenKhoa');
            request.input('MaChuyenKhoa', mssql_1.default.Int, bacSi.MaChuyenKhoa);
        }
        if (bacSi.BangCap) {
            fields.push('BangCap = @BangCap');
            request.input('BangCap', mssql_1.default.NVarChar, bacSi.BangCap);
        }
        if (bacSi.SoNamKinhNghiem) {
            fields.push('SoNamKinhNghiem = @SoNamKinhNghiem');
            request.input('SoNamKinhNghiem', mssql_1.default.Int, bacSi.SoNamKinhNghiem);
        }
        if (bacSi.MoTa) {
            fields.push('MoTa = @MoTa');
            request.input('MoTa', mssql_1.default.NVarChar, bacSi.MoTa);
        }
        query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaBacSi = @MaBacSi';
        const result = await request.query(query);
        return result.recordset[0];
    }
    async delete(maBacSi) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaBacSi', mssql_1.default.Int, maBacSi)
            .query('DELETE FROM BacSi WHERE MaBacSi = @MaBacSi');
        return result.rowsAffected[0] > 0;
    }
    async getByChuyenKhoa(maChuyenKhoa) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('MaChuyenKhoa', mssql_1.default.Int, maChuyenKhoa)
            .query('SELECT * FROM BacSi WHERE MaChuyenKhoa = @MaChuyenKhoa');
        return result.recordset;
    }
    async searchByName(keyword) {
        const pool = (0, database_1.getPool)();
        const pattern = `%${keyword}%`;
        const result = await pool
            .request()
            .input('Keyword', mssql_1.default.NVarChar, pattern)
            .query(`SELECT bs.*, nd.HoTen, nd.TenDangNhap FROM BacSi bs
         JOIN NguoiDung nd ON bs.MaNguoiDung = nd.MaNguoiDung
         WHERE nd.HoTen LIKE @Keyword OR nd.TenDangNhap LIKE @Keyword`);
        return result.recordset;
    }
}
exports.BacSiRepository = BacSiRepository;
//# sourceMappingURL=BacSiRepository.js.map