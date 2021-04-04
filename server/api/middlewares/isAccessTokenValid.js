import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';

const isAccessTokenValid = async (req, res, next) => {
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        try {
            const decodedUser = await jwt.verify(token, config.jwtSecretKey);
            const user = await User.findByIdToken(decodedUser.idToken);
            if(!user) {
                return res.status(401).json({message : 'User not found'});
            }
            else{
                req.user = {
                     _id: user.id,
                     nickName: user.nickName
                };
            }

        } catch(err) {
            if (err.message === 'jwt expired') {
                return res.status(401).json({message : 'expired token'});
            } else {
                return res.status(401).json({message : 'invalid token'});
            }
        }
        next();
      } else {
        return res.status(401).json({message : 'Token not found'});
      }
  }
  export { isAccessTokenValid };