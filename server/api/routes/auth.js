import { Router } from 'express'; 
import { AuthService } from '../../services/index.js';

const route = Router();

export default (app) => {
    /*
    권한에 관련된 Router를 정의한다.
    # GET /auth : Refresh Token을 이용해 Access Token 발급
    - Refresh Token이 존재하지 않거나 유효하지 않을 경우 error: -1
    - Access Token이 유효하지 않을 경우 error: -2
    */
    app.use('/auth', route);

    route.get('/', async (req, res, next) => {
        if(!req.cookies.R_AUTH) {
            return res.status(401).json({
                error: -1,
                message : 'Refresh token not found'
            });
        }
        let AuthServiceInstance = new AuthService();
        const { decodeSuccess, _id, nickName, email, image, accessToken } = await AuthServiceInstance.reissueAccessToken(req.cookies.R_AUTH);
        // Refresh Token가 유효하지 않을 경우
        console.log(accessToken);
        if(!decodeSuccess) {
            return res.status(401).json({
                error: -1,
                message : 'Invalid refresh token'
            });
        }
        else {
            return res.status(200).json({
                _id,
                email,
                nickName,
                image,
                accessToken
            });        
        }
    });
}