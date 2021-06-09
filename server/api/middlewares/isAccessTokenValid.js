import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';

// Access Token이 유효한지 확인한다.
// - Refresh Token이 존재하지 않거나 유효하지 않을 경우 error: -1
// - Access Token이 유효하지 않을 경우 error: -2
const isAccessTokenValid = async (req, res, next) => {
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        try {
            const decodedUser = await jwt.verify(token, config.jwtSecretKey);
            const user = await User.findByIdToken(decodedUser.idToken);
            if(!user) {
                return res.status(401).json({
                    error : -2,
                    message : 'User not found'
                });
            }
            else{
                req.user = {
                     _id: user.id,
                     nickName: user.nickName
                };
            }
        } catch(err) {
            if (err.message === 'jwt expired') {
                return res.status(401).json({
                    error : -2,
                    message : 'Expired access token'
                });
            } else {
                return res.status(401).json({
                    error : -2,
                    message : 'Invalid access token'
                });
            }
        }
        next();
      } else {
        return res.status(401).json({
            error : -2,
            message : 'Token not found'
        });
      }
  }
  export { isAccessTokenValid };