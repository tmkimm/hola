import { Router } from 'express'; 
import { Study } from '../../models/Study.js';
import { OAuth2Client} from 'google-auth-library';
import logger from '../../loaders/logger.js';
const client = new OAuth2Client('883481629680-maq49j99rprpqk2p1ujsd6mli0tp7lpg.apps.googleusercontent.com');
const route = Router();

export default (app) => {
    app.use('/auth', route);

    // 1. api/auth/login 으로 id token, access token, name, email 등 전달받음
    // 2. google-auth-library로 유효한 id token인지 확인하고 아니면 올바른 사용자가 아님을 return
    // 3. 올바른 사용자라면 회원 테이블에 가입된 사용자인지 확인해서 토큰 return해줌

    /* Oauth2.0 구글 로그인 */
    route.post('/', function(req, res, next) {
        const { tokenId, email, name, accessToken } = req.body;

        const ticket = client.verifyIdToken({
            idToken: tokenId
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];     //Google ID
        logger.info(`googleId : ${googleId}, email: ${email}, name: ${name}, userId: ${userId}`);
        return res.status(201).json({googleId});


        // const study = new Study(req.body);
        // study.save((err, studies) => {
        // if (err)
        //     return res.status(400).json({ errors: [
        //     {
        //         location: 'body',
        //         param: 'name',
        //         error: 'TypeError',
        //         message: 'must be String'
        //     }
        //     ], err });
        // return res.status(201).json(studies);
        // })
    });
}