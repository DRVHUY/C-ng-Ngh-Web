import { DonThuoc } from '../models';
export declare class DonThuocRepository {
    getAll(): Promise<DonThuoc[]>;
    getById(maDonThuoc: number): Promise<DonThuoc | null>;
    getByHoSoKham(maHoSoKham: number): Promise<DonThuoc | null>;
    create(donThuoc: Omit<DonThuoc, 'MaDonThuoc' | 'NgayKe'>): Promise<DonThuoc>;
    delete(maDonThuoc: number): Promise<boolean>;
}
//# sourceMappingURL=DonThuocRepository.d.ts.map