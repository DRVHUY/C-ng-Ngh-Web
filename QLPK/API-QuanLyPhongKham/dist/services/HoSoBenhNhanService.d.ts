import { HoSoBenhNhan } from '../models';
export declare class HoSoBenhNhanService {
    private repository;
    constructor();
    layTatCa(): Promise<HoSoBenhNhan[]>;
    layTheoId(maHoSo: number): Promise<HoSoBenhNhan | null>;
    layTheoBenhNhan(maBenhNhan: number): Promise<HoSoBenhNhan | null>;
    taoMoi(hoSo: Omit<HoSoBenhNhan, 'MaHoSo'>): Promise<HoSoBenhNhan>;
    capNhat(maHoSo: number, hoSo: Partial<HoSoBenhNhan>): Promise<HoSoBenhNhan>;
    xoa(maHoSo: number): Promise<boolean>;
}
//# sourceMappingURL=HoSoBenhNhanService.d.ts.map