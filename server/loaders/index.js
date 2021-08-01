//var expressLoader = require('./express');
//var logger = require('morgan');
import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import logger from './logger.js';
import errorHandler from './errorHandler.js';

export default (app) => {
    mongooseLoader(app);
    logger.info('✌️ MongoDB Connected');
    expressLoader(app);
    errorHandler(app);
    logger.info('✌️ Express loaded');
};