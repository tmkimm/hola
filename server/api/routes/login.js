import { Router } from 'express'; 
import { AuthService, UserServcie } from '../../services/index.js';
import { isTokenValidWithGoogle, isTokenValidWithGithub, isTokenValidWithKakao, nickNameDuplicationCheck, autoSignUp } from '../middlewares/index.js';

const route = Router();

export default (app) => {
    /*
    로그인에 관련된 Router를 정의한다.
    로그인 시 각 소셜 로그인 Oauth 서버를 통해 올바른 토큰인지 확인한다.(idToken)
    # POST /login/signup : 로그인 후 회원 가입
    # POST /login/google : Oauth 구글 로그인
    # POST /login/github : Oauth 깃 로그인
    # POST /login/kakao : Oauth 카카오 로그인
    */
    app.use('/login', route);

    // 회원 가입
    // - 로그인 시 회원 정보가 Insert되므로 회원 가입 시 정보를 수정한다.
    // - 회원 가입 완료 시 Refresh Token과 Access Token이 발급된다.
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
    // isTokenValidWithGoogle : 클라이언트에게 전달받은 idToken을 이용해 유효성 검증 후 사용자 정보를 가져온다.
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
    // isTokenValidWithGithub : 클라이언트에게 전달받은 idToken을 이용해 유효성 검증 후 사용자 정보를 가져온다.
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
    // isTokenValidWithKakao : 클라이언트에게 전달받은 idToken을 이용해 유효성 검증 후 사용자 정보를 가져온다.
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