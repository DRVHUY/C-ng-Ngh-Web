import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDatabase, closeDatabase } from './config/database';
import { config } from './config/config';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/errorHandler';

const app: Express = express();
const PORT = config.port;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use(routes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'API Quản lý Phòng khám đang hoạt động',
    version: '1.0.0',
  });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Initialize server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening
    app.listen(PORT, () => {
      console.log(`✓ Server đang chạy tại port ${PORT}`);
      console.log(`✓ URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Lỗi khởi động server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✓ Đang tắt server...');
  await closeDatabase();
  process.exit(0);
});

export default app;
startServer();
