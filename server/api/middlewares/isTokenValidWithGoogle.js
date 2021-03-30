import config from '../../config/index.js';
import { OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client(config.googleClientID);

const isTokenValidWithGoogle = async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: config.googleClientID
        });  
        const payload = ticket.getPayload();
        const { sub: idToken, name, email } = payload; 
        const tokenType = 'Google';
        req.user = { idToken, tokenType, name, email };
        next();
    } catch (error) {
        res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithGoogle };