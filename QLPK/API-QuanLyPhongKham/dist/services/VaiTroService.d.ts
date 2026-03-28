import { VaiTro } from '../models';
export declare class VaiTroService {
    private repository;
    constructor();
    layTatCa(): Promise<VaiTro[]>;
    layTheoId(maVaiTro: number): Promise<VaiTro | null>;
    layTheoTen(tenVaiTro: string): Promise<VaiTro | null>;
    taoMoi(vaiTro: Omit<VaiTro, 'MaVaiTro'>): Promise<VaiTro>;
    capNhat(maVaiTro: number, vaiTro: Partial<VaiTro>): Promise<VaiTro>;
    xoa(maVaiTro: number): Promise<boolean>;
}
//# sourceMappingURL=VaiTroService.d.ts.map