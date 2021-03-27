import config from '../../config/index.js';
import axios from 'axios';

const isTokenValidWithGithub = async (req, res, next) => {
    try {
        console.log(`req.body: ${req.body.code}`);

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

        // const emails = await data.json();
        // if (!emails || emails.length === 0) {
        //   return
        // }
        // // Sort by primary email - the user may have several emails, but only one of them will be primary
        // const sortedEmails = emails.sort((a, b) => b.primary - a.primary);
        // profile.email = sortedEmails[0].email;

        // console.log(`data :${profile.email}`);
        return res.status(200).json(data);
        next();

    } catch (error) {
        return res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithGithub };