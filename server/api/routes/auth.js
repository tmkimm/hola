import { Router } from 'express'; 
import AuthService from '../../services/auth.js';

const route = Router();

export default (app) => {
    app.use('/auth', route);

    route.get('/', async (req, res, next) => {
        if(!req.cookies.R_AUTH) {
            return res.status(401).json({
                accessToken: accessToken,
                message : 'Token not found'
            });
        }
        let AuthServiceInstance = new AuthService();
        const accessToken = await AuthServiceInstance.isRefreshTokenValid(req.cookies.R_AUTH);
        
        return res.status(200).json({
            accessToken: accessToken
        });        
    });
}