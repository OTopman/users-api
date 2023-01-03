
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import morganBody from 'morgan-body';

import AppError from '@helpers/AppError';
import globalErrorHandler from '@middlewares/globalErrorHandler';
import rateLimitHandler from '@middlewares/rateLimitHandler';
import xssCleanHandler from '@middlewares/xssCleanHandler';
import user from '@routes/user';

const app = express();
app.set('trust proxy', 1);

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

morganBody(app, {
  filterParameters: ['password']
});

// Enable CORS ==> Cross Origin Resource Sharing
app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'DELETE', 'GET'],
  optionsSuccessStatus: 200
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '4kb' }));

// Express rate limiter
app.use(rateLimitHandler);

// XSS clean
app.use(xssCleanHandler);

// Filter HTTP Headers
app.use(helmet());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Remove server header
app.use((req: Request, res: Response, next: NextFunction) => {
  res.removeHeader('Server');
  next();
});

// Compress response middleware
app.use(compression());

// Endpoints goes here...
app.use('/api/v1/users', user);

// Page not found
app.use('*', (req: Request, _: Response, next: NextFunction) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
