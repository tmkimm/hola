import { Router } from 'express'; 
import { AuthService } from '../../services/index.js';

const route = Router();

export default (app) => {
    app.use('/auth', route);

    // -1, -2
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