import { getPool } from '../config/database';
import { DonThuoc } from '../models';
import sql from 'mssql';

export class DonThuocRepository {
  async getAll(): Promise<DonThuoc[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM DonThuoc');
    return result.recordset;
  }

  async getById(maDonThuoc: number): Promise<DonThuoc | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaDonThuoc', sql.Int, maDonThuoc)
      .query('SELECT * FROM DonThuoc WHERE MaDonThuoc = @MaDonThuoc');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByHoSoKham(maHoSoKham: number): Promise<DonThuoc | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoSoKham', sql.Int, maHoSoKham)
      .query('SELECT * FROM DonThuoc WHERE MaHoSoKham = @MaHoSoKham');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(donThuoc: Omit<DonThuoc, 'MaDonThuoc' | 'NgayKe'>): Promise<DonThuoc> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoSoKham', sql.Int, donThuoc.MaHoSoKham)
      .query(
        `INSERT INTO DonThuoc (MaHoSoKham) 
        OUTPUT INSERTED.* 
        VALUES (@MaHoSoKham)`
      );
    return result.recordset[0];
  }

  async delete(maDonThuoc: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaDonThuoc', sql.Int, maDonThuoc)
      .query('DELETE FROM DonThuoc WHERE MaDonThuoc = @MaDonThuoc');
    return result.rowsAffected[0] > 0;
  }
}
