import { ChuyenKhoa } from '../models';
export declare class ChuyenKhoaService {
    private repository;
    constructor();
    layTatCa(): Promise<ChuyenKhoa[]>;
    layTheoId(maChuyenKhoa: number): Promise<ChuyenKhoa | null>;
    taoMoi(chuyenKhoa: Omit<ChuyenKhoa, 'MaChuyenKhoa'>): Promise<ChuyenKhoa>;
    capNhat(maChuyenKhoa: number, chuyenKhoa: Partial<ChuyenKhoa>): Promise<ChuyenKhoa>;
    xoa(maChuyenKhoa: number): Promise<boolean>;
}
//# sourceMappingURL=ChuyenKhoaService.d.ts.map