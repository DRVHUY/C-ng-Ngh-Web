import { BacSi } from '../models';
export declare class BacSiRepository {
    getAll(): Promise<BacSi[]>;
    getById(maBacSi: number): Promise<BacSi | null>;
    getByMaNguoiDung(maNguoiDung: number): Promise<BacSi | null>;
    create(bacSi: Omit<BacSi, 'MaBacSi'>): Promise<BacSi>;
    update(maBacSi: number, bacSi: Partial<BacSi>): Promise<BacSi>;
    delete(maBacSi: number): Promise<boolean>;
    getByChuyenKhoa(maChuyenKhoa: number): Promise<BacSi[]>;
    searchByName(keyword: string): Promise<any[]>;
}
//# sourceMappingURL=BacSiRepository.d.ts.map