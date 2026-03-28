import { getPool } from '../config/database';
import { HoaDon } from '../models';
import sql from 'mssql';

export class HoaDonRepository {
  async getAll(): Promise<HoaDon[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM HoaDon');
    return result.recordset;
  }

  async getById(maHoaDon: number): Promise<HoaDon | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoaDon', sql.Int, maHoaDon)
      .query('SELECT * FROM HoaDon WHERE MaHoaDon = @MaHoaDon');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(hoaDon: Omit<HoaDon, 'MaHoaDon'>): Promise<HoaDon> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaLichHen', sql.Int, hoaDon.MaLichHen)
      .input('TongTien', sql.Decimal(18, 2), hoaDon.TongTien)
      .input('TrangThai', sql.NVarChar, hoaDon.TrangThai)
      .input('NgayThanhToan', sql.DateTime, hoaDon.NgayThanhToan || null)
      .query(
        `INSERT INTO HoaDon (MaLichHen, TongTien, TrangThai, NgayThanhToan) 
        OUTPUT INSERTED.* 
        VALUES (@MaLichHen, @TongTien, @TrangThai, @NgayThanhToan)`
      );
    return result.recordset[0];
  }

  async update(maHoaDon: number, hoaDon: Partial<HoaDon>): Promise<HoaDon> {
    const pool = getPool();
    let query = 'UPDATE HoaDon SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaHoaDon', sql.Int, maHoaDon);

    if (hoaDon.TongTien) {
      fields.push('TongTien = @TongTien');
      request.input('TongTien', sql.Decimal(18, 2), hoaDon.TongTien);
    }
    if (hoaDon.TrangThai) {
      fields.push('TrangThai = @TrangThai');
      request.input('TrangThai', sql.NVarChar, hoaDon.TrangThai);
    }
    if (hoaDon.NgayThanhToan) {
      fields.push('NgayThanhToan = @NgayThanhToan');
      request.input('NgayThanhToan', sql.DateTime, hoaDon.NgayThanhToan);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaHoaDon = @MaHoaDon';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maHoaDon: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaHoaDon', sql.Int, maHoaDon)
      .query('DELETE FROM HoaDon WHERE MaHoaDon = @MaHoaDon');
    return result.rowsAffected[0] > 0;
  }
}
