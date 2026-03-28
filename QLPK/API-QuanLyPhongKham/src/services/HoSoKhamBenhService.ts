import { HoSoKhamBenh } from '../models';
import { HoSoKhamBenhRepository } from '../repositories/HoSoKhamBenhRepository';

export class HoSoKhamBenhService {
  private repository: HoSoKhamBenhRepository;

  constructor() {
    this.repository = new HoSoKhamBenhRepository();
  }

  async layTatCa(): Promise<HoSoKhamBenh[]> {
    return this.repository.getAll();
  }

  async layTheoId(maHoSoKham: number): Promise<HoSoKhamBenh | null> {
    return this.repository.getById(maHoSoKham);
  }

  async layTheoLichHen(maLichHen: number): Promise<HoSoKhamBenh | null> {
    return this.repository.getByLichHen(maLichHen);
  }

  async taoMoi(hoSoKham: Omit<HoSoKhamBenh, 'MaHoSoKham' | 'NgayKham'>): Promise<HoSoKhamBenh> {
    return this.repository.create(hoSoKham);
  }

  async capNhat(maHoSoKham: number, hoSoKham: Partial<HoSoKhamBenh>): Promise<HoSoKhamBenh> {
    const existing = await this.repository.getById(maHoSoKham);
    if (!existing) {
      throw new Error('Hồ sơ khám bệnh không tồn tại');
    }

    return this.repository.update(maHoSoKham, hoSoKham);
  }

  async xoa(maHoSoKham: number): Promise<boolean> {
    const existing = await this.repository.getById(maHoSoKham);
    if (!existing) {
      throw new Error('Hồ sơ khám bệnh không tồn tại');
    }

    return this.repository.delete(maHoSoKham);
  }
}
