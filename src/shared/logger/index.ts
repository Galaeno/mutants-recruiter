// Dependencias externas
import winston, { Logger as WinstonLogger, transports, format } from 'winston';

// Configuracion
import { ENV } from '../constants/app';

export const logLevels: any = {
  error: 0,
  warning: 1,
  info: 2,
  debug: 3
};

const prodTransport: transports.FileTransportInstance = new transports.File({
  filename: 'logs/app.log',
  level: 'error'
});

const devTransport: transports.ConsoleTransportInstance = new transports.Console({
  format: format.simple()
});

const logger: WinstonLogger = winston.createLogger({
  level: 'info',
  levels: logLevels.labels,
  transports: [ENV === 'production' ? prodTransport : devTransport]
});

export const ERROR = (msg: string, meta?: any): void => {
  logger.error(msg, meta);
}

export const WARN = (msg: string, meta?: any): void => {
  logger.warn(msg, meta);
}

export const INFO = (msg: string, meta?: any): void => {
  logger.info(msg, meta);
}

export const DEBUG = (msg: string, meta?: any): void => {
  logger.debug(msg, meta);
}