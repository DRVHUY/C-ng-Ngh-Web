import { LichHen } from '../models';
import { LichHenRepository } from '../repositories/LichHenRepository';

export class LichHenService {
  private repository: LichHenRepository;

  constructor() {
    this.repository = new LichHenRepository();
  }

  async layTatCa(): Promise<LichHen[]> {
    return this.repository.getAll();
  }

  async layTheoId(maLichHen: number): Promise<LichHen | null> {
    return this.repository.getById(maLichHen);
  }

  async layTheoBenhNhan(maBenhNhan: number): Promise<LichHen[]> {
    return this.repository.getByBenhNhan(maBenhNhan);
  }

  async taoMoi(lichHen: Omit<LichHen, 'MaLichHen' | 'NgayDat'>): Promise<LichHen> {
    return this.repository.create(lichHen);
  }

  async capNhat(maLichHen: number, lichHen: Partial<LichHen>): Promise<LichHen> {
    const existing = await this.repository.getById(maLichHen);
    if (!existing) {
      throw new Error('Lịch hẹn không tồn tại');
    }

    return this.repository.update(maLichHen, lichHen);
  }

  async xoa(maLichHen: number): Promise<boolean> {
    const existing = await this.repository.getById(maLichHen);
    if (!existing) {
      throw new Error('Lịch hẹn không tồn tại');
    }

    return this.repository.delete(maLichHen);
  }
}
