import { LichHen } from '../models';
export declare class LichHenService {
    private repository;
    constructor();
    layTatCa(): Promise<LichHen[]>;
    layTheoId(maLichHen: number): Promise<LichHen | null>;
    layTheoBenhNhan(maBenhNhan: number): Promise<LichHen[]>;
    taoMoi(lichHen: Omit<LichHen, 'MaLichHen' | 'NgayDat'>): Promise<LichHen>;
    capNhat(maLichHen: number, lichHen: Partial<LichHen>): Promise<LichHen>;
    xoa(maLichHen: number): Promise<boolean>;
}
//# sourceMappingURL=LichHenService.d.ts.map