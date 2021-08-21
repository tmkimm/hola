import { Router } from 'express'; 
import { AuthService, NotificationService } from '../../services/index.js';
import { isAccessTokenValid } from '../middlewares/index.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";

const route = Router();

export default (app) => {
    /*
    권한에 관련된 Router를 정의한다.
    # GET /auth : Refresh Token을 이용해 Access Token 발급
    - Refresh Token이 존재하지 않거나 유효하지 않을 경우 error: -1
    - Access Token이 유효하지 않을 경우 error: -2
    */
    app.use('/auth', route);

    // Refresh Token을 이용해 Access Token 발급
    route.get('/', asyncErrorWrapper(async (req, res, next) => {
        if(!req.cookies.R_AUTH) {
            throw new CustomError('RefreshTokenError', 401, 'Refresh token not found');
        }
        let AuthServiceInstance = new AuthService();
        const { decodeSuccess, _id, nickName, email, image, likeLanguages, accessToken } = await AuthServiceInstance.reissueAccessToken(req.cookies.R_AUTH);
        // Refresh Token가 유효하지 않을 경우
        if(!decodeSuccess) {
            res.clearCookie('R_AUTH');
            throw new CustomError('RefreshTokenError', 401, 'Invalid refresh token');
        }
        else {
            let NotificationServcieInstance = new NotificationService();
            let unReadNoticeCount = await NotificationServcieInstance.findUnReadCount(_id);
            let hasUnreadNotice = unReadNoticeCount > 0 ? true : false;
            return res.status(200).json({
                _id,
                email,
                nickName,
                image,
                likeLanguages,
                accessToken,
                hasUnreadNotice
            });        
        }
    }));

    // Access Token이 유효한지 체크
    route.get('/isValid', isAccessTokenValid, async (req, res, next) => {
        return res.status(200).json({
            isValid: true
        });        
    });
}