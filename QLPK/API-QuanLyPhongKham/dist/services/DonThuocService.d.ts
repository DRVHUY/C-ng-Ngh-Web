import { DonThuoc } from '../models';
export declare class DonThuocService {
    private repository;
    constructor();
    layTatCa(): Promise<DonThuoc[]>;
    layTheoId(maDonThuoc: number): Promise<DonThuoc | null>;
    layTheoHoSoKham(maHoSoKham: number): Promise<DonThuoc | null>;
    taoMoi(donThuoc: Omit<DonThuoc, 'MaDonThuoc' | 'NgayKe'>): Promise<DonThuoc>;
    xoa(maDonThuoc: number): Promise<boolean>;
}
//# sourceMappingURL=DonThuocService.d.ts.map