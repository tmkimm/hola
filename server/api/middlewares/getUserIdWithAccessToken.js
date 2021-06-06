import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';

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