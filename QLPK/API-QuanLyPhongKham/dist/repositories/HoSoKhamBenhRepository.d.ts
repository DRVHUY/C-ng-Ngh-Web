import { HoSoKhamBenh } from '../models';
export declare class HoSoKhamBenhRepository {
    getAll(): Promise<HoSoKhamBenh[]>;
    getById(maHoSoKham: number): Promise<HoSoKhamBenh | null>;
    getByLichHen(maLichHen: number): Promise<HoSoKhamBenh | null>;
    create(hoSoKham: Omit<HoSoKhamBenh, 'MaHoSoKham' | 'NgayKham'>): Promise<HoSoKhamBenh>;
    update(maHoSoKham: number, hoSoKham: Partial<HoSoKhamBenh>): Promise<HoSoKhamBenh>;
    delete(maHoSoKham: number): Promise<boolean>;
}
//# sourceMappingURL=HoSoKhamBenhRepository.d.ts.map