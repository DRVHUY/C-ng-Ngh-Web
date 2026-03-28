import { Request, Response, NextFunction } from 'express';
export interface CustomRequest extends Request {
    userId?: number;
}
export declare function errorHandler(err: Error | any, req: Request, res: Response, next: NextFunction): void;
export declare function notFound(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=errorHandler.d.ts.map