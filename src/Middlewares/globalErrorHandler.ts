import { Request, Response, NextFunction } from 'express';
import AppError from '../Helpers/AppError';
import messages from '../Helpers/messages';

// Handle database errors
const handleCastError = function (err: any) {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateEntry = function (_err: any) {
  // const value = err.err;
};

/**
 *
 * Send error in development environment
 *
 * @param {Error | AppError} err - Error object
 * @param {Response} res - Response object
 */
const sendDevelopmentError = (err: any, res: Response) => {
  return res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    error: err,
    stackTrace: err.stack,
  });
};
/**
 *
 * Send error in production environment
 *
 * @param {AppError | Error} err - Error object
 * @param {Response} res - Response object
 */
const sendProductionError = (err: any, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'failed',
      message: messages.UNKNOWN_ERR,
    });
  }
};

/**
 * This will handle global error
 *
 * @param {AppError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let error = err;
  if (error.name === 'CastError') {
    error = handleCastError(error);
  }

  // Handle production error
  if (process.env.NODE_ENV === 'production') {
    sendProductionError(error, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendDevelopmentError(error, res);
  }
};
