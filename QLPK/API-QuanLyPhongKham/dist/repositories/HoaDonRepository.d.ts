import { HoaDon } from '../models';
export declare class HoaDonRepository {
    getAll(): Promise<HoaDon[]>;
    getById(maHoaDon: number): Promise<HoaDon | null>;
    create(hoaDon: Omit<HoaDon, 'MaHoaDon'>): Promise<HoaDon>;
    update(maHoaDon: number, hoaDon: Partial<HoaDon>): Promise<HoaDon>;
    delete(maHoaDon: number): Promise<boolean>;
}
//# sourceMappingURL=HoaDonRepository.d.ts.map