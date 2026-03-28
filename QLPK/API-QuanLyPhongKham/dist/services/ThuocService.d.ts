import { DanhMucThuoc, Thuoc, TonKho, PhieuNhapThuoc, ChiTietPhieuNhap, ChiTietDonThuoc } from '../models';
export declare class DanhMucThuocService {
    private repository;
    layTatCa(): Promise<DanhMucThuoc[]>;
    layTheoId(id: number): Promise<DanhMucThuoc | null>;
    taoMoi(data: Omit<DanhMucThuoc, 'MaDanhMuc'>): Promise<DanhMucThuoc>;
    capNhat(id: number, data: Partial<DanhMucThuoc>): Promise<DanhMucThuoc>;
    xoa(id: number): Promise<boolean>;
}
export declare class ThuocService {
    private repository;
    layTatCa(): Promise<Thuoc[]>;
    layTheoId(id: number): Promise<Thuoc | null>;
    layTheoDanhMuc(maDanhMuc: number): Promise<Thuoc[]>;
    taoMoi(data: Omit<Thuoc, 'MaThuoc'>): Promise<Thuoc>;
    capNhat(id: number, data: Partial<Thuoc>): Promise<Thuoc>;
    xoa(id: number): Promise<boolean>;
}
export declare class TonKhoService {
    private repository;
    layTatCa(): Promise<TonKho[]>;
    layTheoId(id: number): Promise<TonKho | null>;
    layTheoThuoc(maThuoc: number): Promise<TonKho[]>;
    capNhat(id: number, data: Partial<TonKho>): Promise<TonKho>;
}
export declare class PhieuNhapThuocService {
    private repository;
    layTatCa(): Promise<PhieuNhapThuoc[]>;
    layTheoId(id: number): Promise<PhieuNhapThuoc | null>;
    taoMoi(data: Omit<PhieuNhapThuoc, 'MaPhieuNhap'>): Promise<PhieuNhapThuoc>;
    capNhat(id: number, data: Partial<PhieuNhapThuoc>): Promise<PhieuNhapThuoc>;
    xoa(id: number): Promise<boolean>;
}
export declare class ChiTietPhieuNhapService {
    private repository;
    layTatCa(): Promise<ChiTietPhieuNhap[]>;
    layTheoPhieu(maPhieuNhap: number): Promise<ChiTietPhieuNhap[]>;
    layTheoId(id: number): Promise<ChiTietPhieuNhap | null>;
    taoMoi(data: Omit<ChiTietPhieuNhap, 'MaChiTiet'>): Promise<ChiTietPhieuNhap>;
}
export declare class ChiTietDonThuocService {
    private repository;
    layTatCa(): Promise<ChiTietDonThuoc[]>;
    layTheoDon(maDonThuoc: number): Promise<ChiTietDonThuoc[]>;
    layTheoId(id: number): Promise<ChiTietDonThuoc | null>;
    taoMoi(data: Omit<ChiTietDonThuoc, 'MaChiTiet'>): Promise<ChiTietDonThuoc>;
}
//# sourceMappingURL=ThuocService.d.ts.map