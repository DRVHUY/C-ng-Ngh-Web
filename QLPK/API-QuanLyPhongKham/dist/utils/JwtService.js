"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtService {
    /**
     * Tạo JWT token
     */
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.SECRET, {
            expiresIn: this.EXPIRATION,
        });
    }
    /**
     * Xác thực và giải mã JWT token
     */
    static verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.SECRET);
            return decoded;
        }
        catch (error) {
            console.error('JWT Verification Error:', error instanceof Error ? error.message : error);
            return null;
        }
    }
    /**
     * Lấy token từ Authorization header
     */
    static extractTokenFromHeader(authHeader) {
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
    static decodeToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtService = JwtService;
JwtService.SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';
JwtService.EXPIRATION = '24h';
//# sourceMappingURL=JwtService.js.map