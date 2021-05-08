import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import config from '../config/index.js';
import cors from 'cors';
import routes from '../api/index.js';

export default (app) => {
    const whitelist = ['http://localhost:3000', 'http://holaworld.io', 'https://holaworld.io'];
    const corsOptions = {
        origin: function(origin, callback){
        const isWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted); 
      },
      credentials:true
    };
    app.use(cors(corsOptions));
    //app.use(cors({credentials: true}));
    app.use(express.json()); 
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(path.resolve(), 'public')));
    app.use(config.api.prefix, routes());
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });
    
    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
}

