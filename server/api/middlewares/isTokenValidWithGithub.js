import config from '../../config/index.js';
import axios from 'axios';

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

        // 사용자 이메일 가져오기
        const userEmails = await axios.get(
            'https://api.github.com/user/emails',
            {
                headers: {
                    Authorization : `token ${accessToken.data.access_token}`
            }
        });
        const filterEmails = await userEmails.data.filter(user => {
            return user.primary && user.visibility === 'private'
        });

        const idToken = userInfo.id;
        const name = userInfo.name;
        const tokenType = 'Github';
        const email = filterEmails[0].email;
        req.user = { idToken, name, email, tokenType };

        next();
    } catch (error) {
        return res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithGithub };