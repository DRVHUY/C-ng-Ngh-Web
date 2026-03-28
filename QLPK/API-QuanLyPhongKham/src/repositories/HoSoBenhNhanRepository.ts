import { getPool } from '../config/database';
import { HoSoBenhNhan } from '../models';
import sql from 'mssql';

export class HoSoBenhNhanRepository {
  async getAll(): Promise<HoSoBenhNhan[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM HoSoBenhNhan');
    return result.recordset;
  }

  async getById(maHoSo: number): Promise<HoSoBenhNhan | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoSo', sql.Int, maHoSo)
      .query('SELECT * FROM HoSoBenhNhan WHERE MaHoSo = @MaHoSo');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByBenhNhan(maBenhNhan: number): Promise<HoSoBenhNhan | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBenhNhan', sql.Int, maBenhNhan)
      .query('SELECT * FROM HoSoBenhNhan WHERE MaBenhNhan = @MaBenhNhan');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(hoSo: Omit<HoSoBenhNhan, 'MaHoSo'>): Promise<HoSoBenhNhan> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBenhNhan', sql.Int, hoSo.MaBenhNhan)
      .input('TienSuBenh', sql.NVarChar, hoSo.TienSuBenh)
      .input('DiUngThuoc', sql.NVarChar, hoSo.DiUngThuoc)
      .input('GhiChu', sql.NVarChar, hoSo.GhiChu)
      .query(
        `INSERT INTO HoSoBenhNhan (MaBenhNhan, TienSuBenh, DiUngThuoc, GhiChu) 
        OUTPUT INSERTED.* 
        VALUES (@MaBenhNhan, @TienSuBenh, @DiUngThuoc, @GhiChu)`
      );
    return result.recordset[0];
  }

  async update(maHoSo: number, hoSo: Partial<HoSoBenhNhan>): Promise<HoSoBenhNhan> {
    const pool = getPool();
    let query = 'UPDATE HoSoBenhNhan SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaHoSo', sql.Int, maHoSo);

    if (hoSo.TienSuBenh) {
      fields.push('TienSuBenh = @TienSuBenh');
      request.input('TienSuBenh', sql.NVarChar, hoSo.TienSuBenh);
    }
    if (hoSo.DiUngThuoc) {
      fields.push('DiUngThuoc = @DiUngThuoc');
      request.input('DiUngThuoc', sql.NVarChar, hoSo.DiUngThuoc);
    }
    if (hoSo.GhiChu) {
      fields.push('GhiChu = @GhiChu');
      request.input('GhiChu', sql.NVarChar, hoSo.GhiChu);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaHoSo = @MaHoSo';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maHoSo: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoSo', sql.Int, maHoSo)
      .query('DELETE FROM HoSoBenhNhan WHERE MaHoSo = @MaHoSo');
    return result.rowsAffected[0] > 0;
  }
}
