import { getPool } from '../config/database';
import { LichHen } from '../models';
import sql from 'mssql';

export class LichHenRepository {
  async getAll(): Promise<LichHen[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM LichHen');
    return result.recordset;
  }

  async getById(maLichHen: number): Promise<LichHen | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaLichHen', sql.Int, maLichHen)
      .query('SELECT * FROM LichHen WHERE MaLichHen = @MaLichHen');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByBenhNhan(maBenhNhan: number): Promise<LichHen[]> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBenhNhan', sql.Int, maBenhNhan)
      .query('SELECT * FROM LichHen WHERE MaBenhNhan = @MaBenhNhan');
    return result.recordset;
  }

  async create(lichHen: Omit<LichHen, 'MaLichHen' | 'NgayDat'>): Promise<LichHen> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBenhNhan', sql.Int, lichHen.MaBenhNhan)
      .input('MaBacSi', sql.Int, lichHen.MaBacSi)
      .input('MaLich', sql.Int, lichHen.MaLich)
      .input('ThoiGianHen', sql.DateTime, lichHen.ThoiGianHen)
      .input('TrangThai', sql.NVarChar, lichHen.TrangThai)
      .query(
        `INSERT INTO LichHen (MaBenhNhan, MaBacSi, MaLich, ThoiGianHen, TrangThai) 
        OUTPUT INSERTED.* 
        VALUES (@MaBenhNhan, @MaBacSi, @MaLich, @ThoiGianHen, @TrangThai)`
      );
    return result.recordset[0];
  }

  async update(maLichHen: number, lichHen: Partial<LichHen>): Promise<LichHen> {
    const pool = getPool();
    let query = 'UPDATE LichHen SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaLichHen', sql.Int, maLichHen);

    if (lichHen.TrangThai) {
      fields.push('TrangThai = @TrangThai');
      request.input('TrangThai', sql.NVarChar, lichHen.TrangThai);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaLichHen = @MaLichHen';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maLichHen: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaLichHen', sql.Int, maLichHen)
      .query('DELETE FROM LichHen WHERE MaLichHen = @MaLichHen');
    return result.rowsAffected[0] > 0;
  }
}
