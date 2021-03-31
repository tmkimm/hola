import { Router } from 'express'; 
//import { } from '../middlewares/index.js';

const route = Router();

export default (app) => {
    app.use('/logout', route);

    // 로그아웃(Refresh Token 삭제)
    route.post('/', (req, res, next) => {
        res.clearCookie('R_AUTH');
        res.status(204).json();
    })
}