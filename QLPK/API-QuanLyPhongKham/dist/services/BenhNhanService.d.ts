import { BenhNhan } from '../models';
export declare class BenhNhanService {
    private repository;
    constructor();
    layTatCa(): Promise<BenhNhan[]>;
    layTheoId(maBenhNhan: number): Promise<BenhNhan | null>;
    layTheoMaNguoiDung(maNguoiDung: number): Promise<BenhNhan | null>;
    timKiem(ten: string): Promise<any[]>;
    taoMoi(benhNhan: Omit<BenhNhan, 'MaBenhNhan'>): Promise<BenhNhan>;
    capNhat(maBenhNhan: number, benhNhan: Partial<BenhNhan>): Promise<BenhNhan>;
    xoa(maBenhNhan: number): Promise<boolean>;
}
//# sourceMappingURL=BenhNhanService.d.ts.map