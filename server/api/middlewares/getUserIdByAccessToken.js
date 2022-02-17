import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';


// Access Token을 이용해 로그인 된 사용자인지 판단한다.
// 로그인된 사용자일 경우 req.user._id를 세팅한다.
const getUserIdByAccessToken = asyncErrorWrapper(async (req, res, next) => {
    let userId = '';
    if(req.headers.authorization?.startsWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        try {
            const { idToken } = await jwt.verify(token, config.jwtSecretKey);
            const user = await User.findByIdToken(idToken);
            if(user) {
                req.user = { _id : user.id };
            }
        } catch(err) {}
    }

    next();
  });
  export { getUserIdByAccessToken };
