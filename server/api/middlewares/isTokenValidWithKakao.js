import axios from 'axios';

// 클라이언트에게 전달받은 token을 이용해 사용자 정보를 가져온다.
// 각 소셜 로그인에 따라 Oauth 서버를 호출한다.
const isTokenValidWithKakao = async (req, res, next) => {
    try {
        console.log(`kakao req.body.code : ${req.body.code}`);
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
        
        console.log(`idToken : ${idToken}`);


        const idToken = kakaoResponse.data.id;
        const tokenType = 'Kakao';
        const name = kakaoResponse.data.kakao_account.profile.nickname;

        console.log(`name : ${name}`);


        req.user = { idToken, tokenType, name };

        next();
    } catch (error) {
        return res.status(401).json({message : 'Invalid credentials'});
    }
}

export { isTokenValidWithKakao };