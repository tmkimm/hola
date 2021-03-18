import config from '../config/index.js';
import { OAuth2Client} from 'google-auth-library';
import { User } from '../models/User.js';
import { decodeToken } from './token.js';

const client = new OAuth2Client(config.googleClientID);

export default class AuthService {
    async SignInGoogle(tokenId) {
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
                return res.status(200).json({
                    loginSuccess: false,
                    message : '회원 가입을 진행해야 합니다.'
                });
            }

            // Access Token, Refresh Token 발급
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            return {userEmail, userName, accessToken, refreshToken};
        } catch(error) {
            res.status(401).json({message : 'Invalid credentials'});
        }
    }

    async isRefreshTokenValid(refreshToken) {
        const decodeRefreshToken = decodeToken(refreshToken);
        if(!decodeRefreshToken) {
            res.status(401).json({message : 'invalid token'});
        }
        
        const user =  await User.findByEmail(decodeRefreshToken.email);
        const accessToken = user.generateAccessToken();
        return accessToken;
    }
}