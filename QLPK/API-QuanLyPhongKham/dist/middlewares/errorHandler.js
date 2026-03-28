"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFound = notFound;
function errorHandler(err, req, res, next) {
    console.error('Lỗi:', err);
    const status = err.status || 500;
    const message = err.message || 'Có lỗi xảy ra trên server';
    res.status(status).json({
        success: false,
        message,
        timestamp: new Date(),
    });
}
function notFound(req, res, next) {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy endpoint này',
        path: req.path,
    });
}
//# sourceMappingURL=errorHandler.js.map