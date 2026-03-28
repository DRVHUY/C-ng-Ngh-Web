"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticateToken = exports.authenticateToken = void 0;
const JwtService_1 = require("../utils/JwtService");
/**
 * Middleware xác thực JWT token
 * Kiểm tra token có hợp lệ không và thêm user info vào request
 */
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = JwtService_1.JwtService.extractTokenFromHeader(authHeader);
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Không tìm thấy token. Vui lòng đăng nhập.',
            });
            return;
        }
        const decoded = JwtService_1.JwtService.verifyToken(token);
        if (!decoded) {
            res.status(401).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn.',
            });
            return;
        }
        // Thêm user info vào request
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Lỗi xác thực: ' + (error instanceof Error ? error.message : 'Unknown error'),
        });
    }
};
exports.authenticateToken = authenticateToken;
/**
 * Optional middleware - không yêu cầu token nhưng sẽ thêm user nếu token có
 */
const optionalAuthenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = JwtService_1.JwtService.extractTokenFromHeader(authHeader);
        if (token) {
            const decoded = JwtService_1.JwtService.verifyToken(token);
            if (decoded) {
                req.user = decoded;
            }
        }
        next();
    }
    catch (error) {
        // Không throw lỗi, chỉ continue
        next();
    }
};
exports.optionalAuthenticateToken = optionalAuthenticateToken;
//# sourceMappingURL=authMiddleware.js.map