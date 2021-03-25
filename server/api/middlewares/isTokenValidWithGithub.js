import config from '../../config/index.js';
import axios from 'axios';

const isTokenValidWithGithub = async (req, res, next) => {
    try {
        console.log(`req.body: ${req.body.code}`);
        console.log(`config.githubClientID: ${config.githubClientID}`);
        console.log(`config.githubClientSecret: ${config.githubClientSecret}`);

        const response = await axios.post(
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

        const accessToken = response.data.access_token;
        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
            Authorization: `token ${accessToken}`,
            },
        });

        console.log(`data :${data}`);
        next();

    } catch (error) {
        res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithGithub };