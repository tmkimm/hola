import axios from 'axios';

const isTokenValidWithKakao = async (req, res, next) => {
    try {
        // 사용자 정보 가져오기
        const kakaoResponse = await axios.post(
            'https://kapi.kakao.com/v2/user/me',
            {
                property_keys: ["kakao_account.email"]
            },
            {
                headers: {
                    Authorization: `Bearer ${req.body.code}`,
                }
            }
        );
        
        const idToken = kakaoResponse.data.id;
        const tokenType = 'Kakao';
        const name = kakaoResponse.data.kakao_account.profile.nickname;
        req.user = { idToken, tokenType, name };

        next();
    } catch (error) {
        return res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithKakao };