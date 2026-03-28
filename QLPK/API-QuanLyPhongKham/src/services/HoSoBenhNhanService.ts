import { HoSoBenhNhan } from '../models';
import { HoSoBenhNhanRepository } from '../repositories/HoSoBenhNhanRepository';

export class HoSoBenhNhanService {
  private repository: HoSoBenhNhanRepository;

  constructor() {
    this.repository = new HoSoBenhNhanRepository();
  }

  async layTatCa(): Promise<HoSoBenhNhan[]> {
    return this.repository.getAll();
  }

  async layTheoId(maHoSo: number): Promise<HoSoBenhNhan | null> {
    return this.repository.getById(maHoSo);
  }

  async layTheoBenhNhan(maBenhNhan: number): Promise<HoSoBenhNhan | null> {
    return this.repository.getByBenhNhan(maBenhNhan);
  }

  async taoMoi(hoSo: Omit<HoSoBenhNhan, 'MaHoSo'>): Promise<HoSoBenhNhan> {
    return this.repository.create(hoSo);
  }

  async capNhat(maHoSo: number, hoSo: Partial<HoSoBenhNhan>): Promise<HoSoBenhNhan> {
    const existing = await this.repository.getById(maHoSo);
    if (!existing) {
      throw new Error('Hồ sơ bệnh nhân không tồn tại');
    }

    return this.repository.update(maHoSo, hoSo);
  }

  async xoa(maHoSo: number): Promise<boolean> {
    const existing = await this.repository.getById(maHoSo);
    if (!existing) {
      throw new Error('Hồ sơ bệnh nhân không tồn tại');
    }

    return this.repository.delete(maHoSo);
  }
}
