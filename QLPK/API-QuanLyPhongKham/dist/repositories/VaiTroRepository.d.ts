import { VaiTro } from '../models';
export declare class VaiTroRepository {
    getAll(): Promise<VaiTro[]>;
    getById(maVaiTro: number): Promise<VaiTro | null>;
    getByTenVaiTro(tenVaiTro: string): Promise<VaiTro | null>;
    create(vaiTro: Omit<VaiTro, 'MaVaiTro'>): Promise<VaiTro>;
    update(maVaiTro: number, vaiTro: Partial<VaiTro>): Promise<VaiTro>;
    delete(maVaiTro: number): Promise<boolean>;
}
//# sourceMappingURL=VaiTroRepository.d.ts.map