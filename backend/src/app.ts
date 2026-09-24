import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { AppError } from './utils/app-error';
import { sendError } from './utils/api-response';
import authRoutes from './routes/auth.routes';
import guidanceRoutes from './routes/guidance.routes';

const app: Express = express();

// Security Middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

// Body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging
app.use(pinoHttp({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, data: { status: 'ok' } });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/guidance', guidanceRoutes);

// Catch unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handler
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, 'APP_ERROR', err.message);
  }

  console.error('Unhandled Error:', err);
  return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Something went wrong');
});

export default app;
