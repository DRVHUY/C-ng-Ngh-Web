import { NguoiDung } from '../models';
export declare class NguoiDungService {
    private repository;
    private vaiTroRepository;
    constructor();
    private getRoleIdByName;
    layTatCa(): Promise<NguoiDung[]>;
    layTheoId(maNguoiDung: number): Promise<NguoiDung | null>;
    layTheoTenDangNhap(tenDangNhap: string): Promise<NguoiDung | null>;
    timKiem(ten: string): Promise<NguoiDung[]>;
    taoMoi(nguoiDung: Omit<NguoiDung, 'MaNguoiDung' | 'NgayTao'> & {
        VaiTro?: string;
    }): Promise<NguoiDung>;
    capNhat(maNguoiDung: number, nguoiDung: Partial<NguoiDung> & {
        VaiTro?: string;
    }): Promise<NguoiDung>;
    xoa(maNguoiDung: number): Promise<boolean>;
    kiemTraMatKhau(tenDangNhap: string, matKhau: string): Promise<any>;
    layVaiTro(maNguoiDung: number): Promise<string[]>;
    ganVaiTro(maNguoiDung: number, maVaiTro: number): Promise<void>;
}
//# sourceMappingURL=NguoiDungService.d.ts.map