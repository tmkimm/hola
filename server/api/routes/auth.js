import { Router } from 'express'; 
import { AuthService } from '../../services/index.js';

const route = Router();

export default (app) => {
    app.use('/auth', route);

    route.get('/', async (req, res, next) => {
        if(!req.cookies.R_AUTH) {
            return res.status(401).json({
                message : 'Token not found'
            });
        }
        let AuthServiceInstance = new AuthService();
        const { _id, nickName, email, image, accessToken } = await AuthServiceInstance.reissueAccessToken(req.cookies.R_AUTH);
        console.log(`accessToken : ${accessToken}`);
        return res.status(200).json({
            _id,
            email,
            nickName,
            image,
            accessToken
        });        
    });
}