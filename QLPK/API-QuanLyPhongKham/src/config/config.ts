import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 7000,
  db: {
    server: process.env.DB_SERVER || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433'),
    database: process.env.DB_NAME || 'QuanLyPhongKham',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'huy2005',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_secret_key_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
};
