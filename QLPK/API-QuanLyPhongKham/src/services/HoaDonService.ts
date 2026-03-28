import { HoaDon } from '../models';
import { HoaDonRepository } from '../repositories/HoaDonRepository';

export class HoaDonService {
  private repository: HoaDonRepository;

  constructor() {
    this.repository = new HoaDonRepository();
  }

  async layTatCa(): Promise<HoaDon[]> {
    return this.repository.getAll();
  }

  async layTheoId(maHoaDon: number): Promise<HoaDon | null> {
    return this.repository.getById(maHoaDon);
  }

  async taoMoi(hoaDon: Omit<HoaDon, 'MaHoaDon'>): Promise<HoaDon> {
    return this.repository.create(hoaDon);
  }

  async capNhat(maHoaDon: number, hoaDon: Partial<HoaDon>): Promise<HoaDon> {
    const existing = await this.repository.getById(maHoaDon);
    if (!existing) {
      throw new Error('Hóa đơn không tồn tại');
    }

    return this.repository.update(maHoaDon, hoaDon);
  }

  async xoa(maHoaDon: number): Promise<boolean> {
    const existing = await this.repository.getById(maHoaDon);
    if (!existing) {
      throw new Error('Hóa đơn không tồn tại');
    }

    return this.repository.delete(maHoaDon);
  }
}
