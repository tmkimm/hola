import config from '../../config/index.js';
import axios from 'axios';

// 클라이언트에게 전달받은 token을 이용해 사용자 정보를 가져온다.
// 각 소셜 로그인에 따라 Oauth 서버를 호출한다.
const isTokenValidWithGithub = async (req, res, next) => {

    try {
        // 인가코드를 이용하여 AccessToken 발급
        const accessToken = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                code: req.body.code,
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
        const idToken = userInfo.id;
        console.log(`git idToken : ${idToken}`);
        const name = userInfo.name;
        console.log(`git name : ${name}`);
        const tokenType = 'Github';
        req.user = { idToken, tokenType, name };
        next();
    } catch (error) {
        return res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithGithub };