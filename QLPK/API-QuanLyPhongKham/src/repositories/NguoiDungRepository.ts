import { getPool } from '../config/database';
import { NguoiDung } from '../models';
import sql from 'mssql';

export class NguoiDungRepository {
  async getAll(): Promise<NguoiDung[]> {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT nd.*, vt.TenVaiTro as VaiTro
      FROM NguoiDung nd
      LEFT JOIN NguoiDungVaiTro nvt ON nd.MaNguoiDung = nvt.MaNguoiDung
      LEFT JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
      ORDER BY nd.MaNguoiDung
    `);
    return result.recordset;
  }

  async getById(maNguoiDung: number): Promise<NguoiDung | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .query('SELECT * FROM NguoiDung WHERE MaNguoiDung = @MaNguoiDung');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async searchByName(keyword: string): Promise<NguoiDung[]> {
    const pool = getPool();
    const pattern = `%${keyword}%`;
    const result = await pool
      .request()
      .input('Keyword', sql.NVarChar, pattern)
      .query(
        `SELECT * FROM NguoiDung WHERE HoTen LIKE @Keyword OR TenDangNhap LIKE @Keyword`
      );
    return result.recordset;
  }

  async getByTenDangNhap(tenDangNhap: string): Promise<NguoiDung | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenDangNhap', sql.NVarChar, tenDangNhap)
      .query('SELECT * FROM NguoiDung WHERE TenDangNhap = @TenDangNhap');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(nguoiDung: Omit<NguoiDung, 'MaNguoiDung' | 'NgayTao'>): Promise<NguoiDung> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenDangNhap', sql.NVarChar, nguoiDung.TenDangNhap)
      .input('MatKhau', sql.NVarChar, nguoiDung.MatKhau)
      .input('HoTen', sql.NVarChar, nguoiDung.HoTen)
      .input('DienThoai', sql.NVarChar, nguoiDung.DienThoai)
      .input('Email', sql.NVarChar, nguoiDung.Email)
      .input('TrangThai', sql.Bit, nguoiDung.TrangThai)
      .query(
        `INSERT INTO NguoiDung (TenDangNhap, MatKhau, HoTen, DienThoai, Email, TrangThai) 
        OUTPUT INSERTED.* 
        VALUES (@TenDangNhap, @MatKhau, @HoTen, @DienThoai, @Email, @TrangThai)`
      );
    return result.recordset[0];
  }

  async update(maNguoiDung: number, nguoiDung: Partial<NguoiDung>): Promise<NguoiDung> {
    const pool = getPool();
    
    let query = 'UPDATE NguoiDung SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaNguoiDung', sql.Int, maNguoiDung);

    if (nguoiDung.HoTen) {
      fields.push('HoTen = @HoTen');
      request.input('HoTen', sql.NVarChar, nguoiDung.HoTen);
    }
    if (nguoiDung.DienThoai) {
      fields.push('DienThoai = @DienThoai');
      request.input('DienThoai', sql.NVarChar, nguoiDung.DienThoai);
    }
    if (nguoiDung.Email) {
      fields.push('Email = @Email');
      request.input('Email', sql.NVarChar, nguoiDung.Email);
    }
    if (nguoiDung.MatKhau) {
      fields.push('MatKhau = @MatKhau');
      request.input('MatKhau', sql.NVarChar, nguoiDung.MatKhau);
    }
    if (typeof nguoiDung.TrangThai !== 'undefined') {
      fields.push('TrangThai = @TrangThai');
      request.input('TrangThai', sql.Bit, nguoiDung.TrangThai);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaNguoiDung = @MaNguoiDung';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maNguoiDung: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .query('DELETE FROM NguoiDung WHERE MaNguoiDung = @MaNguoiDung');
    return result.rowsAffected[0] > 0;
  }
}
