export interface JwtPayload {
    MaNguoiDung: number;
    TenDangNhap: string;
    Email: string;
    VaiTro: string;
}
export declare class JwtService {
    private static readonly SECRET;
    private static readonly EXPIRATION;
    /**
     * Tạo JWT token
     */
    static generateToken(payload: JwtPayload): string;
    /**
     * Xác thực và giải mã JWT token
     */
    static verifyToken(token: string): JwtPayload | null;
    /**
     * Lấy token từ Authorization header
     */
    static extractTokenFromHeader(authHeader: string | undefined): string | null;
    /**
     * Decode token mà không xác thực (để debug)
     */
    static decodeToken(token: string): JwtPayload | null;
}
//# sourceMappingURL=JwtService.d.ts.map