import { Router } from 'express'; 
import AuthService from '../../services/auth.js';
import { isTokenValidWithGoogle } from '../middlewares/isTokenValidWithGoogle.js';
import { autoSignUp } from '../middlewares/autoSignUp.js';

const route = Router();

export default (app) => {
    app.use('/login', route);

    /* Oauth2.0 구글 로그인 */
    route.post('/google', isTokenValidWithGoogle, autoSignUp, async (req, res, next) => {
        const { idToken } = req.user; 
        let AuthServiceInstance = new AuthService();
        const { accessToken, refreshToken } = await AuthServiceInstance.SignIn(idToken);
        
        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            loginSuccess: true,
            userEmail: req.user.email,
            userNickName: req.user.name,
            accessToken: accessToken
        });
    });
}