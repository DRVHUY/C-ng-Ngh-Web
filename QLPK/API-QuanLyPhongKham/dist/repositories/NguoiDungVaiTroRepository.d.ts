export interface NguoiDungVaiTro {
    MaNguoiDung: number;
    MaVaiTro: number;
}
export interface NguoiDungVaiTroWithDetails {
    MaNguoiDung: number;
    MaVaiTro: number;
    TenVaiTro: string;
}
export declare class NguoiDungVaiTroRepository {
    /**
     * Lấy tất cả vai trò của một người dùng
     */
    getRolesByUserId(maNguoiDung: number): Promise<string[]>;
    /**
     * Lấy vai trò chính của người dùng (vai trò đầu tiên trong danh sách)
     */
    getPrimaryRoleByUserId(maNguoiDung: number): Promise<string | null>;
    /**
     * Kiểm tra xem người dùng có vai trò nào không
     */
    hasRole(maNguoiDung: number, tenVaiTro: string): Promise<boolean>;
    /**
     * Gán vai trò cho người dùng
     */
    assignRole(maNguoiDung: number, maVaiTro: number): Promise<NguoiDungVaiTro>;
    /**
     * Gỡ bỏ tất cả vai trò của người dùng
     */
    revokeAllRoles(maNguoiDung: number): Promise<boolean>;
    /**
     * Lấy tất cả người dùng có vai trò nào đó
     */
    getUsersByRole(tenVaiTro: string): Promise<number[]>;
    /**
     * Lấy tất cả vai trò với chi tiết
     */
    getAllWithDetails(): Promise<NguoiDungVaiTroWithDetails[]>;
}
//# sourceMappingURL=NguoiDungVaiTroRepository.d.ts.map