import { DanhMucThuocRepository, ThuocRepository, TonKhoRepository, PhieuNhapThuocRepository, ChiTietPhieuNhapRepository, ChiTietDonThuocRepository } from '../repositories/ThuocRepository';
import { DanhMucThuoc, Thuoc, TonKho, PhieuNhapThuoc, ChiTietPhieuNhap, ChiTietDonThuoc } from '../models';

export class DanhMucThuocService {
  private repository = new DanhMucThuocRepository();

  async layTatCa(): Promise<DanhMucThuoc[]> { return this.repository.getAll(); }
  async layTheoId(id: number): Promise<DanhMucThuoc | null> { return this.repository.getById(id); }
  async taoMoi(data: Omit<DanhMucThuoc, 'MaDanhMuc'>): Promise<DanhMucThuoc> { return this.repository.create(data); }
  async capNhat(id: number, data: Partial<DanhMucThuoc>): Promise<DanhMucThuoc> { return this.repository.update(id, data); }
  async xoa(id: number): Promise<boolean> { return this.repository.delete(id); }
}

export class ThuocService {
  private repository = new ThuocRepository();

  async layTatCa(): Promise<Thuoc[]> { return this.repository.getAll(); }
  async layTheoId(id: number): Promise<Thuoc | null> { return this.repository.getById(id); }
  async layTheoDanhMuc(maDanhMuc: number): Promise<Thuoc[]> { return this.repository.getByDanhMuc(maDanhMuc); }
  async taoMoi(data: Omit<Thuoc, 'MaThuoc'>): Promise<Thuoc> { return this.repository.create(data); }
  async capNhat(id: number, data: Partial<Thuoc>): Promise<Thuoc> { return this.repository.update(id, data); }
  async xoa(id: number): Promise<boolean> { return this.repository.delete(id); }
}

export class TonKhoService {
  private repository = new TonKhoRepository();

  async layTatCa(): Promise<TonKho[]> { return this.repository.getAll(); }
  async layTheoId(id: number): Promise<TonKho | null> { return this.repository.getById(id); }
  async layTheoThuoc(maThuoc: number): Promise<TonKho[]> { return this.repository.getByThuoc(maThuoc); }
  async capNhat(id: number, data: Partial<TonKho>): Promise<TonKho> { return this.repository.update(id, data); }
}

export class PhieuNhapThuocService {
  private repository = new PhieuNhapThuocRepository();

  async layTatCa(): Promise<PhieuNhapThuoc[]> { return this.repository.getAll(); }
  async layTheoId(id: number): Promise<PhieuNhapThuoc | null> { return this.repository.getById(id); }
  async taoMoi(data: Omit<PhieuNhapThuoc, 'MaPhieuNhap'>): Promise<PhieuNhapThuoc> { return this.repository.create(data); }
  async capNhat(id: number, data: Partial<PhieuNhapThuoc>): Promise<PhieuNhapThuoc> { return this.repository.update(id, data); }
  async xoa(id: number): Promise<boolean> { return this.repository.delete(id); }
}

export class ChiTietPhieuNhapService {
  private repository = new ChiTietPhieuNhapRepository();

  async layTatCa(): Promise<ChiTietPhieuNhap[]> { return this.repository.getAll(); }
  async layTheoPhieu(maPhieuNhap: number): Promise<ChiTietPhieuNhap[]> { return this.repository.getByPhieuNhap(maPhieuNhap); }
  async layTheoId(id: number): Promise<ChiTietPhieuNhap | null> { return this.repository.getById(id); }
  async taoMoi(data: Omit<ChiTietPhieuNhap, 'MaChiTiet'>): Promise<ChiTietPhieuNhap> { return this.repository.create(data); }
}

export class ChiTietDonThuocService {
  private repository = new ChiTietDonThuocRepository();

  async layTatCa(): Promise<ChiTietDonThuoc[]> { return this.repository.getAll(); }
  async layTheoDon(maDonThuoc: number): Promise<ChiTietDonThuoc[]> { return this.repository.getByDonThuoc(maDonThuoc); }
  async layTheoId(id: number): Promise<ChiTietDonThuoc | null> { return this.repository.getById(id); }
  async taoMoi(data: Omit<ChiTietDonThuoc, 'MaChiTiet'>): Promise<ChiTietDonThuoc> { return this.repository.create(data); }
}
