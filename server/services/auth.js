import config from '../config/index.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client} from 'google-auth-library';
import { User } from '../models/User.js';

const client = new OAuth2Client(config.googleClientID);

export class AuthService {
    async SignIn(idToken) {
        try {
            const user =  await User.findByIdToken(idToken);

            // Access Token, Refresh Token 발급
            const accessToken = await user.generateAccessToken();
            const refreshToken = await user.generateRefreshToken();
            return { accessToken, refreshToken };
        } catch(error) {
            res.status(401).json({message : 'Invalid credentials'});
        }
    }

    // Refresh Token을 이용하여 Access Token 재발급
    async reissueAccessToken(refreshToken) {
        const decodeRefreshToken = jwt.verify(
            refreshToken,
            config.jwtSecretKey
        );

        if(!decodeRefreshToken) {
            res.status(401).json({message : 'invalid token'});
        }
        
        const user =  await User.findByEmail(decodeRefreshToken.email);
        const { _id, nickName, email } = user;
        const accessToken = await user.generateAccessToken();
        return { _id, nickName, email, accessToken };
    }
}