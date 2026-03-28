import { getPool } from '../config/database';
import { BacSi } from '../models';
import sql from 'mssql';

export class BacSiRepository {
  async getAll(): Promise<BacSi[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM BacSi');
    return result.recordset;
  }

  async getById(maBacSi: number): Promise<BacSi | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBacSi', sql.Int, maBacSi)
      .query('SELECT * FROM BacSi WHERE MaBacSi = @MaBacSi');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByMaNguoiDung(maNguoiDung: number): Promise<BacSi | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .query('SELECT * FROM BacSi WHERE MaNguoiDung = @MaNguoiDung');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(bacSi: Omit<BacSi, 'MaBacSi'>): Promise<BacSi> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, bacSi.MaNguoiDung)
      .input('MaChuyenKhoa', sql.Int, bacSi.MaChuyenKhoa)
      .input('BangCap', sql.NVarChar, bacSi.BangCap)
      .input('SoNamKinhNghiem', sql.Int, bacSi.SoNamKinhNghiem)
      .input('MoTa', sql.NVarChar, bacSi.MoTa)
      .query(
        `INSERT INTO BacSi (MaNguoiDung, MaChuyenKhoa, BangCap, SoNamKinhNghiem, MoTa) 
        OUTPUT INSERTED.* 
        VALUES (@MaNguoiDung, @MaChuyenKhoa, @BangCap, @SoNamKinhNghiem, @MoTa)`
      );
    return result.recordset[0];
  }

  async update(maBacSi: number, bacSi: Partial<BacSi>): Promise<BacSi> {
    const pool = getPool();
    
    let query = 'UPDATE BacSi SET ';
    const fields: string[] = [];
    const request = pool.request().input('MaBacSi', sql.Int, maBacSi);

    if (bacSi.MaChuyenKhoa) {
      fields.push('MaChuyenKhoa = @MaChuyenKhoa');
      request.input('MaChuyenKhoa', sql.Int, bacSi.MaChuyenKhoa);
    }
    if (bacSi.BangCap) {
      fields.push('BangCap = @BangCap');
      request.input('BangCap', sql.NVarChar, bacSi.BangCap);
    }
    if (bacSi.SoNamKinhNghiem) {
      fields.push('SoNamKinhNghiem = @SoNamKinhNghiem');
      request.input('SoNamKinhNghiem', sql.Int, bacSi.SoNamKinhNghiem);
    }
    if (bacSi.MoTa) {
      fields.push('MoTa = @MoTa');
      request.input('MoTa', sql.NVarChar, bacSi.MoTa);
    }

    query += fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaBacSi = @MaBacSi';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(maBacSi: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaBacSi', sql.Int, maBacSi)
      .query('DELETE FROM BacSi WHERE MaBacSi = @MaBacSi');
    return result.rowsAffected[0] > 0;
  }

  async getByChuyenKhoa(maChuyenKhoa: number): Promise<BacSi[]> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaChuyenKhoa', sql.Int, maChuyenKhoa)
      .query('SELECT * FROM BacSi WHERE MaChuyenKhoa = @MaChuyenKhoa');
    return result.recordset;
  }

  async searchByName(keyword: string): Promise<any[]> {
    const pool = getPool();
    const pattern = `%${keyword}%`;
    const result = await pool
      .request()
      .input('Keyword', sql.NVarChar, pattern)
      .query(
        `SELECT bs.*, nd.HoTen, nd.TenDangNhap FROM BacSi bs
         JOIN NguoiDung nd ON bs.MaNguoiDung = nd.MaNguoiDung
         WHERE nd.HoTen LIKE @Keyword OR nd.TenDangNhap LIKE @Keyword`
      );
    return result.recordset;
  }
}
