import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

 /**
   * MongoDB URL
   */
  databaseURL: process.env.MONGODB_URI,

 /**
   * API configs
   */
  api: {
    prefix: '/api'
  },
 /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};