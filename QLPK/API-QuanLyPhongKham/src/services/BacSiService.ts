import { BacSi } from '../models';
import { BacSiRepository } from '../repositories/BacSiRepository';

export class BacSiService {
  private repository: BacSiRepository;

  constructor() {
    this.repository = new BacSiRepository();
  }

  async layTatCa(): Promise<BacSi[]> {
    return this.repository.getAll();
  }

  async layTheoId(maBacSi: number): Promise<BacSi | null> {
    return this.repository.getById(maBacSi);
  }

  async layTheoMaNguoiDung(maNguoiDung: number): Promise<BacSi | null> {
    return this.repository.getByMaNguoiDung(maNguoiDung);
  }

  async layTheoChuyenKhoa(maChuyenKhoa: number): Promise<BacSi[]> {
    return this.repository.getByChuyenKhoa(maChuyenKhoa);
  }

  async timKiem(ten: string): Promise<any[]> {
    if (!ten || ten.trim() === '') {
      return [];
    }
    return this.repository.searchByName(ten.trim());
  }

  async taoMoi(bacSi: Omit<BacSi, 'MaBacSi'>): Promise<BacSi> {
    return this.repository.create(bacSi);
  }

  async capNhat(maBacSi: number, bacSi: Partial<BacSi>): Promise<BacSi> {
    const existing = await this.repository.getById(maBacSi);
    if (!existing) {
      throw new Error('Bác sĩ không tồn tại');
    }

    return this.repository.update(maBacSi, bacSi);
  }

  async xoa(maBacSi: number): Promise<boolean> {
    const existing = await this.repository.getById(maBacSi);
    if (!existing) {
      throw new Error('Bác sĩ không tồn tại');
    }

    return this.repository.delete(maBacSi);
  }
}
