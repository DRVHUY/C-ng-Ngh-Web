import * as sql from 'mssql';
import { config } from './config';

// Connection config lấy từ src/config/config.ts
const dbConfig: sql.config = {
  server: config.db.server,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
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

export let pool: sql.ConnectionPool;

export async function connectDatabase() {
  try {
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('✓ Kết nối Database thành công');
  } catch (error) {
    console.error('✗ Lỗi kết nối Database:', error);
    throw error;
  }
}

export async function closeDatabase() {
  try {
    if (pool) {
      await pool.close();
      console.log('✓ Đóng kết nối Database thành công');
    }
  } catch (error) {
    console.error('✗ Lỗi đóng Database:', error);
  }
}

export function getPool() {
  return pool;
}
