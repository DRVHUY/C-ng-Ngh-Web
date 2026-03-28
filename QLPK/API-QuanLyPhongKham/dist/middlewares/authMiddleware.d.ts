import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../utils/JwtService';
/**
 * Extend Express Request để thêm user info
 */
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
/**
 * Middleware xác thực JWT token
 * Kiểm tra token có hợp lệ không và thêm user info vào request
 */
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Optional middleware - không yêu cầu token nhưng sẽ thêm user nếu token có
 */
export declare const optionalAuthenticateToken: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map