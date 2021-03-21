import config from '../../config/index.js';
import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
      if(req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.user.nickName = decoded.nickName;
        } catch(err) {
            if (err.message === 'jwt expired') {
                res.status(401).json({message : 'expired token'});
            } else {
                res.status(401).json({message : 'invalid token'});
            }
        }
        next();
      } else {
        res.status(401).json({message : 'Token not found'});
      }
  }
  export { isAuth };