import { getPool } from '../config/database';
import { VaiTro } from '../models';
import sql from 'mssql';

export class VaiTroRepository {
  async getAll(): Promise<VaiTro[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM VaiTro');
    return result.recordset;
  }

  async getById(maVaiTro: number): Promise<VaiTro | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaVaiTro', sql.Int, maVaiTro)
      .query('SELECT * FROM VaiTro WHERE MaVaiTro = @MaVaiTro');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByTenVaiTro(tenVaiTro: string): Promise<VaiTro | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenVaiTro', sql.NVarChar, tenVaiTro)
      .query('SELECT * FROM VaiTro WHERE TenVaiTro = @TenVaiTro');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(vaiTro: Omit<VaiTro, 'MaVaiTro'>): Promise<VaiTro> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenVaiTro', sql.NVarChar, vaiTro.TenVaiTro)
      .query(
        `INSERT INTO VaiTro (TenVaiTro) 
        OUTPUT INSERTED.* 
        VALUES (@TenVaiTro)`
      );
    return result.recordset[0];
  }

  async update(maVaiTro: number, vaiTro: Partial<VaiTro>): Promise<VaiTro> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaVaiTro', sql.Int, maVaiTro)
      .input('TenVaiTro', sql.NVarChar, vaiTro.TenVaiTro)
      .query('UPDATE VaiTro SET TenVaiTro = @TenVaiTro OUTPUT INSERTED.* WHERE MaVaiTro = @MaVaiTro');
    return result.recordset[0];
  }

  async delete(maVaiTro: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaVaiTro', sql.Int, maVaiTro)
      .query('DELETE FROM VaiTro WHERE MaVaiTro = @MaVaiTro');
    return result.rowsAffected[0] > 0;
  }
}
