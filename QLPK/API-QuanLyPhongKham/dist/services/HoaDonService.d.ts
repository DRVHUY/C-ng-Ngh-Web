import { HoaDon } from '../models';
export declare class HoaDonService {
    private repository;
    constructor();
    layTatCa(): Promise<HoaDon[]>;
    layTheoId(maHoaDon: number): Promise<HoaDon | null>;
    taoMoi(hoaDon: Omit<HoaDon, 'MaHoaDon'>): Promise<HoaDon>;
    capNhat(maHoaDon: number, hoaDon: Partial<HoaDon>): Promise<HoaDon>;
    xoa(maHoaDon: number): Promise<boolean>;
}
//# sourceMappingURL=HoaDonService.d.ts.map