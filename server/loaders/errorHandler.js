import createError from 'http-errors';
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import { CustomError } from "../CustomError.js";

export default (app) => {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });
    
    app.use(function handleMongoError(error, req, res, next) {
      if (error instanceof mongoose.Error) return res.status(400).json({ type: "MongoError", message: error.message });
      next(error);
    });  

    app.use(function handlejwtError(error, req, res, next) {
      if (error instanceof jsonwebtoken.TokenExpiredError) return res.status(401).json({ type: "TokenExpiredError", message: error.message });
      if (error instanceof jsonwebtoken.JsonWebTokenError) return res.status(401).json({ type: "JsonWebTokenError", message: error.message });
      next(error);
    });

    // custom error handler
    app.use(function handlecustomError(error, req, res, next) {
      if (error instanceof CustomError) {
          const { status, type, message } = error;
          return res.status(status).send({ type, message });
      }
      next(error);
    });

    // error handler
    app.use(function(error, req, res, next) {
      res.status(400).json({ message: error.message });
    });
}

