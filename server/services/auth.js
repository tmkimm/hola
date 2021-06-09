import config from '../config/index.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client} from 'google-auth-library';
import { User } from '../models/User.js';

const client = new OAuth2Client(config.googleClientID);

export class AuthService {
    async SignIn(idToken) {
        const user =  await User.findByIdToken(idToken);
        // Access Token, Refresh Token 발급
        const _id = user._id;
        const nickName = user.nickName;
        const image = user.image;
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        return { _id, nickName, image, accessToken, refreshToken };
    }

    // Refresh Token을 이용하여 Access Token 재발급
    async reissueAccessToken(refreshToken) {
        let decodeSuccess = true;
        let decodeRefreshToken = '';
        try {
            decodeRefreshToken = await jwt.verify(
                refreshToken,
                config.jwtSecretKey
            );
        } catch(err) {
            decodeSuccess = false;
            return { decodeSuccess };
        }
        const user =  await User.findByNickName(decodeRefreshToken.nickName);
        const { _id, nickName, email, image } = user;
        const accessToken = await user.generateAccessToken();
        return { decodeSuccess, _id, nickName, email, image, accessToken };
    }
}