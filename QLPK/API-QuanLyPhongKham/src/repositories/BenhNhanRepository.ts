import { getPool } from '../config/database';
import { BenhNhan } from '../models';
import sql from 'mssql';

export class BenhNhanRepository {
  async getAll(): Promise<BenhNhan[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM BenhNhan');
    return result.recordset;
  }

  async getById(maBenhNhan: number): Promise<BenhNhan | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBenhNhan', sql.Int, maBenhNhan)
      .query('SELECT * FROM BenhNhan WHERE MaBenhNhan = @MaBenhNhan');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByMaNguoiDung(maNguoiDung: number): Promise<BenhNhan | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .query('SELECT * FROM BenhNhan WHERE MaNguoiDung = @MaNguoiDung');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(benhNhan: Omit<BenhNhan, 'MaBenhNhan'>): Promise<BenhNhan> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, benhNhan.MaNguoiDung)
      .input('NgaySinh', sql.Date, benhNhan.NgaySinh)
      .input('GioiTinh', sql.NVarChar, benhNhan.GioiTinh)
      .input('DiaChi', sql.NVarChar, benhNhan.DiaChi)
      .query(
        `INSERT INTO BenhNhan (MaNguoiDung, NgaySinh, GioiTinh, DiaChi) 
        OUTPUT INSERTED.* 
        VALUES (@MaNguoiDung, @NgaySinh, @GioiTinh, @DiaChi)`
      );
    return result.recordset[0];
  }

  async update(maBenhNhan: number, benhNhan: Partial<BenhNhan>): Promise<BenhNhan> {
    const pool = getPool();
    
    let query = 'UPDATE BenhNhan SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaBenhNhan', sql.Int, maBenhNhan);

    if (benhNhan.NgaySinh) {
      fields.push('NgaySinh = @NgaySinh');
      request.input('NgaySinh', sql.Date, benhNhan.NgaySinh);
    }
    if (benhNhan.GioiTinh) {
      fields.push('GioiTinh = @GioiTinh');
      request.input('GioiTinh', sql.NVarChar, benhNhan.GioiTinh);
    }
    if (benhNhan.DiaChi) {
      fields.push('DiaChi = @DiaChi');
      request.input('DiaChi', sql.NVarChar, benhNhan.DiaChi);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaBenhNhan = @MaBenhNhan';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maBenhNhan: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBenhNhan', sql.Int, maBenhNhan)
      .query('DELETE FROM BenhNhan WHERE MaBenhNhan = @MaBenhNhan');
    return result.rowsAffected[0] > 0;
  }

  async searchByName(keyword: string): Promise<any[]> {
    const pool = getPool();
    const pattern = `%${keyword}%`;
    const result = await pool
      .request()
      .input('Keyword', sql.NVarChar, pattern)
      .query(
        `SELECT bn.*, nd.HoTen, nd.TenDangNhap FROM BenhNhan bn
         JOIN NguoiDung nd ON bn.MaNguoiDung = nd.MaNguoiDung
         WHERE nd.HoTen LIKE @Keyword OR nd.TenDangNhap LIKE @Keyword`
      );
    return result.recordset;
  }
}
