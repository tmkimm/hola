import { Router } from 'express'; 

// 입력 받음 : nickName, likeLanguage
// id, email, name, idToken, tokenType
// 회원 가입 시 일단 로그인?
export default (app) => {
    app.use('/users', route);

    route.patch('/', async (req, res, next) => {
        const user;

        res.status(200).json(user);
    })
}