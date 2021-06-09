import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';

// Access Token을 이용해 로그인 된 사용자인지 판단한다.
// 로그인된 사용자일 경우 req.user._id를 세팅한다.
const getUserIdWithAccessToken = async (req, res, next) => {
    let userId = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    let token = req.headers.authorization.split(' ')[1];
    try {
        const decodedUser = await jwt.verify(token, config.jwtSecretKey);
        const user = await User.findByIdToken(decodedUser.idToken);
        if(user) {
            userId = user.id;
        }
    } catch(err) {
    }
    }
    req.user = {
        _id: userId
    }
    next();
  }
  export { getUserIdWithAccessToken };