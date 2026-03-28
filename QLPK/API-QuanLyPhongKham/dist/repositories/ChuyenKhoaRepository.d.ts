import { ChuyenKhoa } from '../models';
export declare class ChuyenKhoaRepository {
    getAll(): Promise<ChuyenKhoa[]>;
    getById(maChuyenKhoa: number): Promise<ChuyenKhoa | null>;
    create(chuyenKhoa: Omit<ChuyenKhoa, 'MaChuyenKhoa'>): Promise<ChuyenKhoa>;
    update(maChuyenKhoa: number, chuyenKhoa: Partial<ChuyenKhoa>): Promise<ChuyenKhoa>;
    delete(maChuyenKhoa: number): Promise<boolean>;
}
//# sourceMappingURL=ChuyenKhoaRepository.d.ts.map