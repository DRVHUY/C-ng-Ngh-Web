import { HoSoKhamBenh } from '../models';
export declare class HoSoKhamBenhService {
    private repository;
    constructor();
    layTatCa(): Promise<HoSoKhamBenh[]>;
    layTheoId(maHoSoKham: number): Promise<HoSoKhamBenh | null>;
    layTheoLichHen(maLichHen: number): Promise<HoSoKhamBenh | null>;
    taoMoi(hoSoKham: Omit<HoSoKhamBenh, 'MaHoSoKham' | 'NgayKham'>): Promise<HoSoKhamBenh>;
    capNhat(maHoSoKham: number, hoSoKham: Partial<HoSoKhamBenh>): Promise<HoSoKhamBenh>;
    xoa(maHoSoKham: number): Promise<boolean>;
}
//# sourceMappingURL=HoSoKhamBenhService.d.ts.map