import config from '../../config/index.js';
import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
      if(req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        try {
            jwt.verify(token, config.jwtSecretKey);
        } catch(err) {
            if (err.message === 'jwt expired') {
                res.status(401).json({message : 'expired token'});
            } else if (err.message === 'invalid token') {
                res.status(401).json({message : 'invalid token'});
            } else {
                res.status(401).json({message : 'invalid token'});
            }
        }
      } else {
        res.status(401).json({message : 'Token not found'});
      }
  }
  export default isAuth;