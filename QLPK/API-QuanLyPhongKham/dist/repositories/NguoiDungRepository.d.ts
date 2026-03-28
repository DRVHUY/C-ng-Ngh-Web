import { NguoiDung } from '../models';
export declare class NguoiDungRepository {
    getAll(): Promise<NguoiDung[]>;
    getById(maNguoiDung: number): Promise<NguoiDung | null>;
    searchByName(keyword: string): Promise<NguoiDung[]>;
    getByTenDangNhap(tenDangNhap: string): Promise<NguoiDung | null>;
    create(nguoiDung: Omit<NguoiDung, 'MaNguoiDung' | 'NgayTao'>): Promise<NguoiDung>;
    update(maNguoiDung: number, nguoiDung: Partial<NguoiDung>): Promise<NguoiDung>;
    delete(maNguoiDung: number): Promise<boolean>;
}
//# sourceMappingURL=NguoiDungRepository.d.ts.map