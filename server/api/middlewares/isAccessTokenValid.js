import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";

// Access Token이 유효한지 확인한다.
const isAccessTokenValid = asyncErrorWrapper(async function(req, res, next) {
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        const decodedUser = await jwt.verify(token, config.jwtSecretKey);
        const user = await User.findByIdToken(decodedUser.idToken);
        if(!user) {
            throw new CustomError('JsonWebTokenError', 401, 'User not found');
        }
        else{
            req.user = {
                    _id: user.id,
                    nickName: user.nickName
            };
        }
        next();
      } else {
          throw new CustomError('JsonWebTokenError', 401, 'Token not found');
      }
  })
  export { isAccessTokenValid };