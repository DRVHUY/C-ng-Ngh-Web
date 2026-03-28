import { VaiTro } from '../models';
import { VaiTroRepository } from '../repositories/VaiTroRepository';

export class VaiTroService {
  private repository: VaiTroRepository;

  constructor() {
    this.repository = new VaiTroRepository();
  }

  async layTatCa(): Promise<VaiTro[]> {
    return this.repository.getAll();
  }

  async layTheoId(maVaiTro: number): Promise<VaiTro | null> {
    return this.repository.getById(maVaiTro);
  }

  async layTheoTen(tenVaiTro: string): Promise<VaiTro | null> {
    return this.repository.getByTenVaiTro(tenVaiTro);
  }

  async taoMoi(vaiTro: Omit<VaiTro, 'MaVaiTro'>): Promise<VaiTro> {
    const existing = await this.repository.getByTenVaiTro(vaiTro.TenVaiTro);
    if (existing) {
      throw new Error('Vai trò này đã tồn tại');
    }

    return this.repository.create(vaiTro);
  }

  async capNhat(maVaiTro: number, vaiTro: Partial<VaiTro>): Promise<VaiTro> {
    const existing = await this.repository.getById(maVaiTro);
    if (!existing) {
      throw new Error('Vai trò không tồn tại');
    }

    return this.repository.update(maVaiTro, vaiTro);
  }

  async xoa(maVaiTro: number): Promise<boolean> {
    const existing = await this.repository.getById(maVaiTro);
    if (!existing) {
      throw new Error('Vai trò không tồn tại');
    }

    return this.repository.delete(maVaiTro);
  }
}
