//var expressLoader = require('./express');
//var logger = require('morgan');
import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import logger from './logger.js';

export default (app) => {
    mongooseLoader(app);
    logger.info('✌️ MongoDB Connected');
    expressLoader(app);
    logger.info('✌️ Express loaded');
};