import { getPool } from '../config/database';
import sql from 'mssql';

export interface NguoiDungVaiTro {
  MaNguoiDung: number;
  MaVaiTro: number;
}

export interface NguoiDungVaiTroWithDetails {
  MaNguoiDung: number;
  MaVaiTro: number;
  TenVaiTro: string;
}

export class NguoiDungVaiTroRepository {
  /**
   * Lấy tất cả vai trò của một người dùng
   */
  async getRolesByUserId(maNguoiDung: number): Promise<string[]> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .query(
        `SELECT vt.TenVaiTro 
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
         WHERE nvt.MaNguoiDung = @MaNguoiDung`
      );
    
    return result.recordset.map(r => r.TenVaiTro);
  }

  /**
   * Lấy vai trò chính của người dùng (vai trò đầu tiên trong danh sách)
   */
  async getPrimaryRoleByUserId(maNguoiDung: number): Promise<string | null> {
    const roles = await this.getRolesByUserId(maNguoiDung);
    return roles.length > 0 ? roles[0] : null;
  }

  /**
   * Kiểm tra xem người dùng có vai trò nào không
   */
  async hasRole(maNguoiDung: number, tenVaiTro: string): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .input('TenVaiTro', sql.NVarChar, tenVaiTro)
      .query(
        `SELECT COUNT(*) as count
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
         WHERE nvt.MaNguoiDung = @MaNguoiDung AND vt.TenVaiTro = @TenVaiTro`
      );
    
    return result.recordset[0].count > 0;
  }

  /**
   * Gán vai trò cho người dùng
   */
  async assignRole(maNguoiDung: number, maVaiTro: number): Promise<NguoiDungVaiTro> {
    const pool = getPool();
    
    // Kiểm tra xem vai trò đã được gán chưa
    const existing = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .input('MaVaiTro', sql.Int, maVaiTro)
      .query(
        `SELECT * FROM NguoiDungVaiTro 
         WHERE MaNguoiDung = @MaNguoiDung AND MaVaiTro = @MaVaiTro`
      );
    
    if (existing.recordset.length > 0) {
      return existing.recordset[0];
    }

    // Thêm vai trò mới
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .input('MaVaiTro', sql.Int, maVaiTro)
      .query(
        `INSERT INTO NguoiDungVaiTro (MaNguoiDung, MaVaiTro) 
         OUTPUT INSERTED.* 
         VALUES (@MaNguoiDung, @MaVaiTro)`
      );

    return result.recordset[0];
  }

  /**
   * Gỡ bỏ tất cả vai trò của người dùng
   */
  async revokeAllRoles(maNguoiDung: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('MaNguoiDung', sql.Int, maNguoiDung)
      .query('DELETE FROM NguoiDungVaiTro WHERE MaNguoiDung = @MaNguoiDung');

    return result.rowsAffected[0] > 0;
  }

  /**
   * Lấy tất cả người dùng có vai trò nào đó
   */
  async getUsersByRole(tenVaiTro: string): Promise<number[]> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenVaiTro', sql.NVarChar, tenVaiTro)
      .query(
        `SELECT nvt.MaNguoiDung
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro
         WHERE vt.TenVaiTro = @TenVaiTro`
      );

    return result.recordset.map(r => r.MaNguoiDung);
  }

  /**
   * Lấy tất cả vai trò với chi tiết
   */
  async getAllWithDetails(): Promise<NguoiDungVaiTroWithDetails[]> {
    const pool = getPool();
    const result = await pool
      .request()
      .query(
        `SELECT nvt.MaNguoiDung, nvt.MaVaiTro, vt.TenVaiTro
         FROM NguoiDungVaiTro nvt
         JOIN VaiTro vt ON nvt.MaVaiTro = vt.MaVaiTro`
      );

    return result.recordset;
  }
}
