import { Router } from 'express'; 
import { AuthService, UserServcie } from '../../services/index.js';
import { isTokenValidWithGoogle, isTokenValidWithGithub, isTokenValidWithKakao, nickNameDuplicationCheck, autoSignUp } from '../middlewares/index.js';

const route = Router();

export default (app) => {
    app.use('/login', route);

    // 회원가입
    route.post('/signup', nickNameDuplicationCheck, async (req, res, next) => {
        const id = req.body.id;
        const userDTO = req.body;
        delete userDTO.id;

        // 회원 정보 수정(등록)
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.modifyUser(id, userDTO);
        
        // AccessToken, RefreshToken 발급
        let AuthServiceInstance = new AuthService();
        const { accessToken, refreshToken } = await AuthServiceInstance.SignIn(user.idToken);

        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            loginSuccess: true,
            _id: user._id,
            nickName: user.nickName,
            image: user.image,
            accessToken: accessToken
        });
    });

    // Oauth2.0 구글 로그인
    route.post('/google', isTokenValidWithGoogle, autoSignUp, async (req, res, next) => {
        const { idToken } = req.user; 
        let AuthServiceInstance = new AuthService();
        const { _id, nickName, image, accessToken, refreshToken } = await AuthServiceInstance.SignIn(idToken);
        
        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            loginSuccess: true,
            _id: _id,
            nickName: nickName,
            image: image,
            accessToken: accessToken
        });
    });

    // OAuth2.0 깃 로그인
    route.post('/github', isTokenValidWithGithub, autoSignUp, async (req, res, next) => {
        const { idToken } = req.user; 
        let AuthServiceInstance = new AuthService();
        const { _id, nickName, image, accessToken, refreshToken } = await AuthServiceInstance.SignIn(idToken);
        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            loginSuccess: true,
            _id: _id,
            nickName: nickName,
            image: image,
            accessToken: accessToken
        });
    });

    // OAuth2.0 카카오 로그인
    route.post('/kakao', isTokenValidWithKakao, autoSignUp, async (req, res, next) => {
        const { idToken } = req.user; 
        let AuthServiceInstance = new AuthService();
        const { _id, nickName, image, accessToken, refreshToken } = await AuthServiceInstance.SignIn(idToken);
        
        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            loginSuccess: true,
            _id: _id,
            nickName: nickName,
            image: image,
            accessToken: accessToken
        });
    });
}