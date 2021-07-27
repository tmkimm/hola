import config from '../../config/index.js';
import { OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client(config.googleClientID);

// 클라이언트에게 전달받은 token을 이용해 사용자 정보를 가져온다.
// 각 소셜 로그인에 따라 Oauth 서버를 호출한다.
const isTokenValidWithGoogle = async (req, res, next) => {
    console.log(`Google req.body.code : ${req.body.code}`);
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.code,
            audience: config.googleClientID
        });  
        const payload = ticket.getPayload();
        const { sub: idToken, name, email } = payload; 
        console.log(`idToken: ${idToken}`);
        console.log(`name: ${name}`);

        const tokenType = 'Google';
        req.user = { idToken, tokenType, name, email };
        next();
    } catch (error) {
        res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithGoogle };