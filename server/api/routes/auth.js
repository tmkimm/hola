import { Router } from 'express'; 
import config from '../../config/index.js';
import { User } from '../../models/User.js';
import { OAuth2Client} from 'google-auth-library';
import logger from '../../loaders/logger.js';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(config.googleClientID);
const route = Router();

export default (app) => {
    app.use('/auth', route);

    /* Oauth2.0 구글 로그인 */
    route.post('/', async (req, res, next) => {
        const { tokenId } = req.body;
  //      try {
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: config.googleClientID
            });
            const payload = ticket.getPayload();
            const { sub: googleId, name: userName, email: userEmail } = payload;

            const user =  await User.findOne({ id: googleId });

            // 신규 사용자 생성
            if (!user) {
                const newUser = new User({
                    id: googleId,
                    email: userEmail,
                    name: userName,
                    idToken: tokenId,
                    tokenType: 'Google'
                });
                newUser.save();
            }

            // Access Token, Refresh Token 발급
            const accessToken = jwt.sign(
                {
                    name: userName,
                    email: userEmail
                },
                config.jwtSecretKey,
                {
                    expiresIn: '1h',
                    issuer: 'Hola',
                });
                
            const refreshToken = jwt.sign(
                {
                    email: userEmail
                },
                config.jwtSecretKey,
                {
                    expiresIn: '2w',
                    issuer: 'Hola',
                });

            res.cookie("X_AUTH", accessToken, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60              // 1 Hour
            });
            res.cookie("R_AUTH", refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
            });

            return res.status(200).json({
                loginSuccess: true,
                userEmail: userEmail
            });
        // } catch(error) {
        //     res.status(402).json({message : 'Invalid credentials'});
        // }
    });
}