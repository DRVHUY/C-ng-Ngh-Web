import { BenhNhan } from '../models';
export declare class BenhNhanRepository {
    getAll(): Promise<BenhNhan[]>;
    getById(maBenhNhan: number): Promise<BenhNhan | null>;
    getByMaNguoiDung(maNguoiDung: number): Promise<BenhNhan | null>;
    create(benhNhan: Omit<BenhNhan, 'MaBenhNhan'>): Promise<BenhNhan>;
    update(maBenhNhan: number, benhNhan: Partial<BenhNhan>): Promise<BenhNhan>;
    delete(maBenhNhan: number): Promise<boolean>;
    searchByName(keyword: string): Promise<any[]>;
}
//# sourceMappingURL=BenhNhanRepository.d.ts.map