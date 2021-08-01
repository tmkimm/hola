import config from '../../config/index.js';
import axios from 'axios';
import { OAuth2Client} from 'google-auth-library';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";
const client = new OAuth2Client(config.googleClientID);

// 클라이언트에게 전달받은 token을 이용해 사용자 정보를 가져온다.
// 각 소셜 로그인에 따라 Oauth 서버를 호출한다.
const isTokenValidWithOauth = asyncErrorWrapper(async (req, res, next) => {
    let { loginType, code } = req.body;
    let { idToken, name, email } = await getUserInfoByOauth(loginType, code);
    if(idToken) {
        req.user = { idToken, tokenType:loginType, name, email };
        next();
    }
    else {
          throw new CustomError('OauthError', 400, 'Oauth parameter is Invalid');
    }
});

// 클라이언트에게 전달받은 token의 유효성을 체크하고 사용자 정보를 리턴한다.
const getUserInfoByOauth = async (loginType, code) => {
    let idToken, name, email;   // return value
    try {
        if(loginType == 'google') {
            const ticket = await client.verifyIdToken({
                idToken: code,
                audience: config.googleClientID
            });  
            const payload = ticket.getPayload();
            idToken = payload.sub; 
            name = payload.name; 
            email = payload.email; 
        } else if(loginType == 'github') {
            // 인가코드를 이용하여 AccessToken 발급
            const accessToken = await axios.post(
                'https://github.com/login/oauth/access_token',
                {
                    code,
                    client_id: config.githubClientID,
                    client_secret: config.githubClientSecret
                },
                {
                    headers: {
                        accept: 'application/json'
                    }
                }
            );

            // 사용자 정보 가져오기
            const { data: userInfo } = await axios.get(
                'https://api.github.com/user',
                {
                    headers: {
                        Authorization: `token ${accessToken.data.access_token}`,
                }
            });
            idToken = userInfo.id;
            name = userInfo.name;            
        } else if(loginType == 'kakao') {
            // 사용자 정보 가져오기
            const kakaoResponse = await axios.post(
                'https://kapi.kakao.com/v2/user/me',
                {
                    property_keys: ["kakao_account.email"]
                },
                {
                    headers: {
                        Authorization: `Bearer ${code}`,
                    }
                }
            );
            idToken = kakaoResponse.data.id;
            name = kakaoResponse.data.kakao_account.profile.nickname;
        } else if(loginType == 'guest') {
            idToken = 'Guest';
        }
        return { idToken, name, email };
    }
    catch (error) {
        return { idToken, name, email };
    }        
}

export { isTokenValidWithOauth };