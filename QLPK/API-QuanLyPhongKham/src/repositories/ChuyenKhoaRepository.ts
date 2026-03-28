import { getPool } from '../config/database';
import { ChuyenKhoa } from '../models';
import sql from 'mssql';

export class ChuyenKhoaRepository {
  async getAll(): Promise<ChuyenKhoa[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM ChuyenKhoa');
    return result.recordset;
  }

  async getById(maChuyenKhoa: number): Promise<ChuyenKhoa | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaChuyenKhoa', sql.Int, maChuyenKhoa)
      .query('SELECT * FROM ChuyenKhoa WHERE MaChuyenKhoa = @MaChuyenKhoa');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(chuyenKhoa: Omit<ChuyenKhoa, 'MaChuyenKhoa'>): Promise<ChuyenKhoa> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenChuyenKhoa', sql.NVarChar, chuyenKhoa.TenChuyenKhoa)
      .input('MoTa', sql.NVarChar, chuyenKhoa.MoTa)
      .query(
        `INSERT INTO ChuyenKhoa (TenChuyenKhoa, MoTa) 
        OUTPUT INSERTED.* 
        VALUES (@TenChuyenKhoa, @MoTa)`
      );
    return result.recordset[0];
  }

  async update(maChuyenKhoa: number, chuyenKhoa: Partial<ChuyenKhoa>): Promise<ChuyenKhoa> {
    const pool = getPool();
    let query = 'UPDATE ChuyenKhoa SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaChuyenKhoa', sql.Int, maChuyenKhoa);

    if (chuyenKhoa.TenChuyenKhoa) {
      fields.push('TenChuyenKhoa = @TenChuyenKhoa');
      request.input('TenChuyenKhoa', sql.NVarChar, chuyenKhoa.TenChuyenKhoa);
    }
    if (chuyenKhoa.MoTa) {
      fields.push('MoTa = @MoTa');
      request.input('MoTa', sql.NVarChar, chuyenKhoa.MoTa);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaChuyenKhoa = @MaChuyenKhoa';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maChuyenKhoa: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaChuyenKhoa', sql.Int, maChuyenKhoa)
      .query('DELETE FROM ChuyenKhoa WHERE MaChuyenKhoa = @MaChuyenKhoa');
    return result.rowsAffected[0] > 0;
  }
}
