import { BacSi } from '../models';
export declare class BacSiService {
    private repository;
    constructor();
    layTatCa(): Promise<BacSi[]>;
    layTheoId(maBacSi: number): Promise<BacSi | null>;
    layTheoMaNguoiDung(maNguoiDung: number): Promise<BacSi | null>;
    layTheoChuyenKhoa(maChuyenKhoa: number): Promise<BacSi[]>;
    timKiem(ten: string): Promise<any[]>;
    taoMoi(bacSi: Omit<BacSi, 'MaBacSi'>): Promise<BacSi>;
    capNhat(maBacSi: number, bacSi: Partial<BacSi>): Promise<BacSi>;
    xoa(maBacSi: number): Promise<boolean>;
}
//# sourceMappingURL=BacSiService.d.ts.map