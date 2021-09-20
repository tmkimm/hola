import winston from 'winston';
import config from '../config/index.js';

const transports = [];
if(process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console()
  )
} else {  
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}
let level, silent;
switch (process.env.NODE_ENV) {
  case "production":
    level = "warning";
    silent = false;
    break;
  case "test":
    level = "emerg";
    silent = true;
    break;
  default:
    level = "debug";
    silent = false;
    break;
}

const LoggerInstance = winston.createLogger({
  level,
  silent,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

export default LoggerInstance;