import { Router } from 'express'; 

const route = Router();

export default (app) => {
    /*
    로그아웃에 관련된 Router를 정의한다.
    # POST /logout : 로그아웃
    */
    app.use('/logout', route);

    // 로그아웃(Refresh Token 삭제)
    route.post('/', (req, res, next) => {
        res.clearCookie('R_AUTH');
        res.status(204).json();
    })
}