import { HoSoBenhNhan } from '../models';
export declare class HoSoBenhNhanRepository {
    getAll(): Promise<HoSoBenhNhan[]>;
    getById(maHoSo: number): Promise<HoSoBenhNhan | null>;
    getByBenhNhan(maBenhNhan: number): Promise<HoSoBenhNhan | null>;
    create(hoSo: Omit<HoSoBenhNhan, 'MaHoSo'>): Promise<HoSoBenhNhan>;
    update(maHoSo: number, hoSo: Partial<HoSoBenhNhan>): Promise<HoSoBenhNhan>;
    delete(maHoSo: number): Promise<boolean>;
}
//# sourceMappingURL=HoSoBenhNhanRepository.d.ts.map