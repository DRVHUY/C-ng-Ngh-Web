import { NguoiDung } from '../models';
import { NguoiDungRepository } from '../repositories/NguoiDungRepository';
import { NguoiDungVaiTroRepository } from '../repositories/NguoiDungVaiTroRepository';
import { JwtService } from '../utils/JwtService';
import bcrypt from 'bcryptjs';
import { getPool } from '../config/database';
import sql from 'mssql';

export class NguoiDungService {
  private repository: NguoiDungRepository;
  private vaiTroRepository: NguoiDungVaiTroRepository;

  constructor() {
    this.repository = new NguoiDungRepository();
    this.vaiTroRepository = new NguoiDungVaiTroRepository();
  }

  private async getRoleIdByName(tenVaiTro: string): Promise<number | null> {
    const pool = getPool();
    const result = await pool
      .request()
      .input('TenVaiTro', sql.NVarChar, tenVaiTro)
      .query('SELECT MaVaiTro FROM VaiTro WHERE TenVaiTro = @TenVaiTro');
    return result.recordset.length > 0 ? result.recordset[0].MaVaiTro : null;
  }

  async layTatCa(): Promise<NguoiDung[]> {
    return this.repository.getAll();
  }

  async layTheoId(maNguoiDung: number): Promise<NguoiDung | null> {
    return this.repository.getById(maNguoiDung);
  }

  async layTheoTenDangNhap(tenDangNhap: string): Promise<NguoiDung | null> {
    return this.repository.getByTenDangNhap(tenDangNhap);
  }

  async timKiem(ten: string): Promise<NguoiDung[]> {
    if (!ten || ten.trim() === '') {
      return [];
    }
    return this.repository.searchByName(ten.trim());
  }

  async taoMoi(nguoiDung: Omit<NguoiDung, 'MaNguoiDung' | 'NgayTao'> & { VaiTro?: string }): Promise<NguoiDung> {
    const existing = await this.repository.getByTenDangNhap(nguoiDung.TenDangNhap);
    if (existing) {
      throw new Error('Tên đăng nhập đã tồn tại');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nguoiDung.MatKhau, salt);

    const newUser = await this.repository.create({
      ...nguoiDung,
      MatKhau: hashedPassword,
    });

    // Gán vai trò nếu được cung cấp
    if (nguoiDung.VaiTro) {
      const roleId = await this.getRoleIdByName(nguoiDung.VaiTro);
      if (roleId) {
        await this.vaiTroRepository.assignRole(newUser.MaNguoiDung, roleId);
      }
    }

    return newUser;
  }

  async capNhat(maNguoiDung: number, nguoiDung: Partial<NguoiDung> & { VaiTro?: string }): Promise<NguoiDung> {
    const existing = await this.repository.getById(maNguoiDung);
    if (!existing) {
      throw new Error('Người dùng không tồn tại');
    }

    // Cập nhật vai trò nếu được cung cấp
    if (nguoiDung.VaiTro) {
      const roleId = await this.getRoleIdByName(nguoiDung.VaiTro);
      if (roleId) {
        // Xóa vai trò cũ
        await this.vaiTroRepository.revokeAllRoles(maNguoiDung);
        // Gán vai trò mới
        await this.vaiTroRepository.assignRole(maNguoiDung, roleId);
      }
    }

    // Loại bỏ VaiTro khỏi object cập nhật vì nó không phải là trường trong bảng NguoiDung
    const { VaiTro, ...updateData } = nguoiDung;

    return this.repository.update(maNguoiDung, updateData);
  }

  async xoa(maNguoiDung: number): Promise<boolean> {
    const existing = await this.repository.getById(maNguoiDung);
    if (!existing) {
      throw new Error('Người dùng không tồn tại');
    }

    return this.repository.delete(maNguoiDung);
  }

  async kiemTraMatKhau(tenDangNhap: string, matKhau: string): Promise<any> {
    const nguoiDung = await this.repository.getByTenDangNhap(tenDangNhap);
    if (!nguoiDung) {
      return null;
    }

    let isValid = false;

    try {
      isValid = await bcrypt.compare(matKhau, nguoiDung.MatKhau);
    } catch (err) {
      isValid = false;
    }

    if (!isValid && nguoiDung.MatKhau === matKhau) {
      isValid = true;

      const newHash = await bcrypt.hash(matKhau, 10);
      await this.repository.update(nguoiDung.MaNguoiDung, { MatKhau: newHash });
    }

    if (!isValid) {
      return null;
    }

    const roles = await this.vaiTroRepository.getRolesByUserId(nguoiDung.MaNguoiDung);
    const primaryRole = roles.length > 0 ? roles[0] : 'BenhNhan';

    const token = JwtService.generateToken({
      MaNguoiDung: nguoiDung.MaNguoiDung,
      TenDangNhap: nguoiDung.TenDangNhap,
      Email: nguoiDung.Email || '',
      VaiTro: primaryRole,
    });

    return {
      success: true,
      token,
      user: {
        MaNguoiDung: nguoiDung.MaNguoiDung,
        TenDangNhap: nguoiDung.TenDangNhap,
        HoTen: nguoiDung.HoTen,
        Email: nguoiDung.Email,
        DienThoai: nguoiDung.DienThoai,
        VaiTro: primaryRole,
        Roles: roles,
      },
    };
  }

  
  async layVaiTro(maNguoiDung: number): Promise<string[]> {
    return this.vaiTroRepository.getRolesByUserId(maNguoiDung);
  }

  
  async ganVaiTro(maNguoiDung: number, maVaiTro: number): Promise<void> {
    await this.vaiTroRepository.assignRole(maNguoiDung, maVaiTro);
  }
}
