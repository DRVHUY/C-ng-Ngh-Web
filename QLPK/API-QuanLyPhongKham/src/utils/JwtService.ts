import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface JwtPayload {
  MaNguoiDung: number;
  TenDangNhap: string;
  Email: string;
  VaiTro: string;
}

export class JwtService {
  private static readonly SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';
  private static readonly EXPIRATION = '24h';

  /**
   * Tạo JWT token
   */
  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.SECRET, {
      expiresIn: this.EXPIRATION,
    });
  }

  /**
   * Xác thực và giải mã JWT token
   */
  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      console.error('JWT Verification Error:', error instanceof Error ? error.message : error);
      return null;
    }
  }

  /**
   * Lấy token từ Authorization header
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }

  /**
   * Decode token mà không xác thực (để debug)
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
