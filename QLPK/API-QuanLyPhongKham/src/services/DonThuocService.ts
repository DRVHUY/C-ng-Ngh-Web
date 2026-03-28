import { DonThuoc } from '../models';
import { DonThuocRepository } from '../repositories/DonThuocRepository';

export class DonThuocService {
  private repository: DonThuocRepository;

  constructor() {
    this.repository = new DonThuocRepository();
  }

  async layTatCa(): Promise<DonThuoc[]> {
    return this.repository.getAll();
  }

  async layTheoId(maDonThuoc: number): Promise<DonThuoc | null> {
    return this.repository.getById(maDonThuoc);
  }

  async layTheoHoSoKham(maHoSoKham: number): Promise<DonThuoc | null> {
    return this.repository.getByHoSoKham(maHoSoKham);
  }

  async taoMoi(donThuoc: Omit<DonThuoc, 'MaDonThuoc' | 'NgayKe'>): Promise<DonThuoc> {
    return this.repository.create(donThuoc);
  }

  async xoa(maDonThuoc: number): Promise<boolean> {
    const existing = await this.repository.getById(maDonThuoc);
    if (!existing) {
      throw new Error('Đơn thuốc không tồn tại');
    }

    return this.repository.delete(maDonThuoc);
  }
}
