import { ChuyenKhoa } from '../models';
import { ChuyenKhoaRepository } from '../repositories/ChuyenKhoaRepository';

export class ChuyenKhoaService {
  private repository: ChuyenKhoaRepository;

  constructor() {
    this.repository = new ChuyenKhoaRepository();
  }

  async layTatCa(): Promise<ChuyenKhoa[]> {
    return this.repository.getAll();
  }

  async layTheoId(maChuyenKhoa: number): Promise<ChuyenKhoa | null> {
    return this.repository.getById(maChuyenKhoa);
  }

  async taoMoi(chuyenKhoa: Omit<ChuyenKhoa, 'MaChuyenKhoa'>): Promise<ChuyenKhoa> {
    return this.repository.create(chuyenKhoa);
  }

  async capNhat(maChuyenKhoa: number, chuyenKhoa: Partial<ChuyenKhoa>): Promise<ChuyenKhoa> {
    const existing = await this.repository.getById(maChuyenKhoa);
    if (!existing) {
      throw new Error('Chuyên khoa không tồn tại');
    }

    return this.repository.update(maChuyenKhoa, chuyenKhoa);
  }

  async xoa(maChuyenKhoa: number): Promise<boolean> {
    const existing = await this.repository.getById(maChuyenKhoa);
    if (!existing) {
      throw new Error('Chuyên khoa không tồn tại');
    }

    return this.repository.delete(maChuyenKhoa);
  }
}
