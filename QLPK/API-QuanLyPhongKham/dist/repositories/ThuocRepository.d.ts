import { DanhMucThuoc, Thuoc, TonKho, PhieuNhapThuoc, ChiTietPhieuNhap, ChiTietDonThuoc } from '../models';
export declare class DanhMucThuocRepository {
    getAll(): Promise<DanhMucThuoc[]>;
    getById(id: number): Promise<DanhMucThuoc | null>;
    create(danhMuc: Omit<DanhMucThuoc, 'MaDanhMuc'>): Promise<DanhMucThuoc>;
    update(id: number, danhMuc: Partial<DanhMucThuoc>): Promise<DanhMucThuoc>;
    delete(id: number): Promise<boolean>;
}
export declare class ThuocRepository {
    getAll(): Promise<Thuoc[]>;
    getById(id: number): Promise<Thuoc | null>;
    getByDanhMuc(maDanhMuc: number): Promise<Thuoc[]>;
    create(thuoc: Omit<Thuoc, 'MaThuoc'>): Promise<Thuoc>;
    update(id: number, thuoc: Partial<Thuoc>): Promise<Thuoc>;
    delete(id: number): Promise<boolean>;
}
export declare class TonKhoRepository {
    getAll(): Promise<TonKho[]>;
    getById(id: number): Promise<TonKho | null>;
    getByThuoc(maThuoc: number): Promise<TonKho[]>;
    update(id: number, tonKho: Partial<TonKho>): Promise<TonKho>;
}
export declare class PhieuNhapThuocRepository {
    getAll(): Promise<PhieuNhapThuoc[]>;
    getById(id: number): Promise<PhieuNhapThuoc | null>;
    create(phieu: Omit<PhieuNhapThuoc, 'MaPhieuNhap'>): Promise<PhieuNhapThuoc>;
    update(id: number, phieu: Partial<PhieuNhapThuoc>): Promise<PhieuNhapThuoc>;
    delete(id: number): Promise<boolean>;
}
export declare class ChiTietPhieuNhapRepository {
    getAll(): Promise<ChiTietPhieuNhap[]>;
    getByPhieuNhap(maPhieuNhap: number): Promise<ChiTietPhieuNhap[]>;
    getById(id: number): Promise<ChiTietPhieuNhap | null>;
    create(chiTiet: Omit<ChiTietPhieuNhap, 'MaChiTiet'>): Promise<ChiTietPhieuNhap>;
}
export declare class ChiTietDonThuocRepository {
    getAll(): Promise<ChiTietDonThuoc[]>;
    getByDonThuoc(maDonThuoc: number): Promise<ChiTietDonThuoc[]>;
    getById(id: number): Promise<ChiTietDonThuoc | null>;
    create(chiTiet: Omit<ChiTietDonThuoc, 'MaChiTiet'>): Promise<ChiTietDonThuoc>;
}
//# sourceMappingURL=ThuocRepository.d.ts.map