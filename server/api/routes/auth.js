import { Router } from 'express'; 
import { User } from '../../models/User.js';
import { decodeToken } from '../../services/token.js';

const route = Router();

export default (app) => {
    app.use('/auth', route);

    route.get('/', (req, res, next) => {
        if(!req.cookies.R_AUTH) {
            return res.status(401).json({
                accessToken: accessToken,
                message : 'Token not found'
            });
        }
        const refreshToken = decodeToken(req.cookies.R_AUTH);
        if(!refreshToken) {
            res.status(401).json({message : 'invalid token'});
        }

        const user =  User.findByEmail(refreshToken.email);
        const accessToken = user.generateAccessToken();
        
        return res.status(200).json({
            accessToken: accessToken
        });
    });
}