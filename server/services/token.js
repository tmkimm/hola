import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const generateToken = (payload, expiresIn) => {
    let token = jwt.sign(
        payload,
        config.jwtSecretKey,
        {
            expiresIn: expiresIn,
            issuer: config.issuer
     });
     return token;
};

const decodeToken = (token) => {
    let decodeToken;
    try {
        decodeToken = jwt.verify(
            token,
            config.jwtSecretKey
        );
    } catch(err) {
        decodeToken = null;
    }
    return decodeToken;
};

export {
     generateToken,
     decodeToken
}