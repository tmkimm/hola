//var expressLoader = require('./express');
//var logger = require('morgan');
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import logger from './logger.js';

export default (app) => {
    expressLoader(app);
    logger.info('✌️ Express loaded');
    mongooseLoader(app);
    logger.info('✌️ MongoDB Connected');
};