import { LichHen } from '../models';
export declare class LichHenRepository {
    getAll(): Promise<LichHen[]>;
    getById(maLichHen: number): Promise<LichHen | null>;
    getByBenhNhan(maBenhNhan: number): Promise<LichHen[]>;
    create(lichHen: Omit<LichHen, 'MaLichHen' | 'NgayDat'>): Promise<LichHen>;
    update(maLichHen: number, lichHen: Partial<LichHen>): Promise<LichHen>;
    delete(maLichHen: number): Promise<boolean>;
}
//# sourceMappingURL=LichHenRepository.d.ts.map