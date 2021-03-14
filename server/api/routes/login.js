import { Router } from 'express'; 
import AuthService from '../../services/auth.js';

const route = Router();

export default (app) => {
    app.use('/login', route);

    /* Oauth2.0 구글 로그인 */
    route.post('/google', async (req, res, next) => {
        const { tokenId } = req.body;
        let AuthServiceInstance = new AuthService();
        const { userEmail, userName, accessToken, refreshToken } = await AuthServiceInstance.SignInGoogle(tokenId);
        
        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            loginSuccess: true,
            userEmail: userEmail,
            userName: userName,
            accessToken: accessToken
        });
    });
}