import { getPool } from '../config/database';
import { HoSoKhamBenh } from '../models';
import sql from 'mssql';

export class HoSoKhamBenhRepository {
  async getAll(): Promise<HoSoKhamBenh[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM HoSoKhamBenh');
    return result.recordset;
  }

  async getById(maHoSoKham: number): Promise<HoSoKhamBenh | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoSoKham', sql.Int, maHoSoKham)
      .query('SELECT * FROM HoSoKhamBenh WHERE MaHoSoKham = @MaHoSoKham');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByLichHen(maLichHen: number): Promise<HoSoKhamBenh | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaLichHen', sql.Int, maLichHen)
      .query('SELECT * FROM HoSoKhamBenh WHERE MaLichHen = @MaLichHen');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(hoSoKham: Omit<HoSoKhamBenh, 'MaHoSoKham' | 'NgayKham'>): Promise<HoSoKhamBenh> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaLichHen', sql.Int, hoSoKham.MaLichHen)
      .input('TrieuChung', sql.NVarChar, hoSoKham.TrieuChung)
      .input('ChanDoan', sql.NVarChar, hoSoKham.ChanDoan)
      .input('GhiChu', sql.NVarChar, hoSoKham.GhiChu)
      .query(
        `INSERT INTO HoSoKhamBenh (MaLichHen, TrieuChung, ChanDoan, GhiChu) 
        OUTPUT INSERTED.* 
        VALUES (@MaLichHen, @TrieuChung, @ChanDoan, @GhiChu)`
      );
    return result.recordset[0];
  }

  async update(maHoSoKham: number, hoSoKham: Partial<HoSoKhamBenh>): Promise<HoSoKhamBenh> {
    const pool = getPool();
    let query = 'UPDATE HoSoKhamBenh SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaHoSoKham', sql.Int, maHoSoKham);

    if (hoSoKham.TrieuChung) {
      fields.push('TrieuChung = @TrieuChung');
      request.input('TrieuChung', sql.NVarChar, hoSoKham.TrieuChung);
    }
    if (hoSoKham.ChanDoan) {
      fields.push('ChanDoan = @ChanDoan');
      request.input('ChanDoan', sql.NVarChar, hoSoKham.ChanDoan);
    }
    if (hoSoKham.GhiChu) {
      fields.push('GhiChu = @GhiChu');
      request.input('GhiChu', sql.NVarChar, hoSoKham.GhiChu);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaHoSoKham = @MaHoSoKham';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maHoSoKham: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoSoKham', sql.Int, maHoSoKham)
      .query('DELETE FROM HoSoKhamBenh WHERE MaHoSoKham = @MaHoSoKham');
    return result.rowsAffected[0] > 0;
  }
}
