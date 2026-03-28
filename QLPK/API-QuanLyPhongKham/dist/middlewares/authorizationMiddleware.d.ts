import { Request, Response, NextFunction } from 'express';
/**
 * Middleware kiểm tra quyền truy cập theo vai trò
 * Sử dụng khi cần giới hạn truy cập cho những vai trò cụ thể
 */
export declare const authorize: (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware kiểm tra xem user có phải là chính mình hoặc admin không
 */
export declare const authorizeOwnerOrAdmin: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorizationMiddleware.d.ts.map