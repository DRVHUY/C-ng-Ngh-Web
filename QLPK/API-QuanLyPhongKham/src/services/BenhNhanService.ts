import { BenhNhan } from '../models';
import { BenhNhanRepository } from '../repositories/BenhNhanRepository';

export class BenhNhanService {
  private repository: BenhNhanRepository;

  constructor() {
    this.repository = new BenhNhanRepository();
  }

  async layTatCa(): Promise<BenhNhan[]> {
    return this.repository.getAll();
  }

  async layTheoId(maBenhNhan: number): Promise<BenhNhan | null> {
    return this.repository.getById(maBenhNhan);
  }

  async layTheoMaNguoiDung(maNguoiDung: number): Promise<BenhNhan | null> {
    return this.repository.getByMaNguoiDung(maNguoiDung);
  }

  async timKiem(ten: string): Promise<any[]> {
    if (!ten || ten.trim() === '') {
      return [];
    }
    return this.repository.searchByName(ten.trim());
  }

  async taoMoi(benhNhan: Omit<BenhNhan, 'MaBenhNhan'>): Promise<BenhNhan> {
    return this.repository.create(benhNhan);
  }

  async capNhat(maBenhNhan: number, benhNhan: Partial<BenhNhan>): Promise<BenhNhan> {
    const existing = await this.repository.getById(maBenhNhan);
    if (!existing) {
      throw new Error('Bệnh nhân không tồn tại');
    }

    return this.repository.update(maBenhNhan, benhNhan);
  }

  async xoa(maBenhNhan: number): Promise<boolean> {
    const existing = await this.repository.getById(maBenhNhan);
    if (!existing) {
      throw new Error('Bệnh nhân không tồn tại');
    }

    return this.repository.delete(maBenhNhan);
  }
}
