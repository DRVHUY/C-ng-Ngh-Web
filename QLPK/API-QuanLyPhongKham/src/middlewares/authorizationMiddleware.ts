import { Request, Response, NextFunction } from 'express';

/**
 * Middleware kiểm tra quyền truy cập theo vai trò
 * Sử dụng khi cần giới hạn truy cập cho những vai trò cụ thể
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Kiểm tra user có được authenticate không
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Chưa xác thực. Vui lòng đăng nhập.',
        });
        return;
      }

      // Kiểm tra vai trò của user
      const userRole = req.user.VaiTro;

      // Nếu không chỉ định vai trò, chỉ cần là user hợp lệ
      if (allowedRoles.length === 0) {
        next();
        return;
      }

      // Kiểm tra xem vai trò của user có trong danh sách không
      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({
          success: false,
          message: `Bạn không có quyền truy cập. Yêu cầu vai trò: ${allowedRoles.join(', ')}, Vai trò của bạn: ${userRole}`,
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi kiểm tra quyền: ' + (error instanceof Error ? error.message : 'Unknown error'),
      });
    }
  };
};

/**
 * Middleware kiểm tra xem user có phải là chính mình hoặc admin không
 */
export const authorizeOwnerOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Chưa xác thực. Vui lòng đăng nhập.',
      });
      return;
    }

    const userId = parseInt(req.params.id);
    const requesterId = req.user.MaNguoiDung;
    const requesterRole = req.user.VaiTro;

    // Cho phép nếu là admin hoặc là chính người dùng đó
    if (requesterRole === 'Admin' || requesterId === userId) {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập tài nguyên này.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi kiểm tra quyền: ' + (error instanceof Error ? error.message : 'Unknown error'),
    });
  }
};
