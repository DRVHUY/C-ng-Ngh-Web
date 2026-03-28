"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./config/database");
const config_1 = require("./config/config");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = config_1.config.port;
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
// Routes
app.use(routes_1.default);
// Health check
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API Quản lý Phòng khám đang hoạt động',
        version: '1.0.0',
    });
});
// Error handlers
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// Initialize server
async function startServer() {
    try {
        // Connect to database
        await (0, database_1.connectDatabase)();
        // Start listening
        app.listen(PORT, () => {
            console.log(`✓ Server đang chạy tại port ${PORT}`);
            console.log(`✓ URL: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('✗ Lỗi khởi động server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n✓ Đang tắt server...');
    await (0, database_1.closeDatabase)();
    process.exit(0);
});
exports.default = app;
startServer();
//# sourceMappingURL=app.js.map