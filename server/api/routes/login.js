import { Router } from 'express'; 
import { OAuth2Client} from 'google-auth-library';
import config from '../../config/index.js';
import { User } from '../../models/User.js';

const client = new OAuth2Client(config.googleClientID);
const route = Router();

export default (app) => {
    app.use('/login', route);

    /* Oauth2.0 구글 로그인 */
    route.post('/google', async (req, res, next) => {
        const { tokenId } = req.body;
        try {
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: config.googleClientID
            });
            const payload = ticket.getPayload();
            const { sub: googleId, name: userName, email: userEmail } = payload;

            const user =  await User.findByUserID(googleId);

            // 신규 사용자 생성
            if (!user) {
                return res.status(400).json({
                    loginSuccess: false,
                    message : '회원 가입을 진행합니다.'
                });
            }

            // Access Token, Refresh Token 발급
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

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
        } catch(error) {
            res.status(401).json({message : 'Invalid credentials'});
        }
    });
}