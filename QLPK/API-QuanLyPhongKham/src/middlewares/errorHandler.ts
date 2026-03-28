import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  userId?: number;
}

export function errorHandler(err: Error | any, req: Request, res: Response, next: NextFunction) {
  console.error('Lỗi:', err);

  const status = err.status || 500;
  const message = err.message || 'Có lỗi xảy ra trên server';

  res.status(status).json({
    success: false,
    message,
    timestamp: new Date(),
  });
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy endpoint này',
    path: req.path,
  });
}
