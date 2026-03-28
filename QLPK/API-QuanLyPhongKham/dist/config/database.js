"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.connectDatabase = connectDatabase;
exports.closeDatabase = closeDatabase;
exports.getPool = getPool;
const sql = __importStar(require("mssql"));
const config_1 = require("./config");
// Connection config lấy từ src/config/config.ts
const dbConfig = {
    server: config_1.config.db.server,
    port: config_1.config.db.port,
    database: config_1.config.db.database,
    user: config_1.config.db.user,
    password: config_1.config.db.password,
    authentication: {
        type: 'default',
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableKeepAlive: true,
    },
    connectionTimeout: 15000,
    requestTimeout: 30000,
};
async function connectDatabase() {
    try {
        exports.pool = new sql.ConnectionPool(dbConfig);
        await exports.pool.connect();
        console.log('✓ Kết nối Database thành công');
    }
    catch (error) {
        console.error('✗ Lỗi kết nối Database:', error);
        throw error;
    }
}
async function closeDatabase() {
    try {
        if (exports.pool) {
            await exports.pool.close();
            console.log('✓ Đóng kết nối Database thành công');
        }
    }
    catch (error) {
        console.error('✗ Lỗi đóng Database:', error);
    }
}
function getPool() {
    return exports.pool;
}
//# sourceMappingURL=database.js.map