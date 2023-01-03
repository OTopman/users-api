import config from '@config';
import winston from 'winston';

import 'winston-daily-rotate-file';

const prettyJSON = winston.format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.timestamp} ${info.label || '-'} ${info.level}: ${info.message}`;
});

const transport = new winston.transports.DailyRotateFile({
  filename: './logs/errors/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20mb',
  maxFiles: '14d',
  level: 'error',
});

const logger = winston.createLogger({
  level: config.loglevel === 'silent' ? undefined : config.loglevel,
  silent: config.loglevel === 'silent',
  handleExceptions: true,
  handleRejections: true,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    prettyJSON
  ),
  defaultMeta: { service: 'justbett-api' },
  transports: [
    transport,
    new winston.transports.Console({})
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: './logs/exceptions/exceptions.log',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    })
  ]
});

export default logger;
