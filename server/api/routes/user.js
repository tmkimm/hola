import { Router } from 'express';
import { UserServcie } from '../../services/index.js';
import { nickNameDuplicationCheck } from '../middlewares/index.js'
const route = Router();

export default (app) => {
    app.use('/users', route);
    
    // s3 pre-sign url 발급
    route.post('/sign', async (req, res, next) => {
        const { fileName } = req.body;
        let UserServcieInstance = new UserServcie();
        const signedUrlPut = await UserServcieInstance.getPreSignUrl(fileName);

        res.status(200).json({
            preSignUrl: signedUrlPut
        });
    });

      
    // 사용자 정보 조회
    route.get('/', async (req, res, next) => {
        const { nickName } = req.query;
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.findByNickName(nickName);

        res.status(200).json(user);
    });

    // 사용자 정보 상세 보기
    route.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.findById(id);

        res.status(200).json(user);
    });

    // 사용자 정보 수정
    route.patch('/:id', nickNameDuplicationCheck, async (req, res, next) => {
        const id = req.params.id;
        const userDTO = req.body;

        let UserServcieInstance = new UserServcie();
        const { userRecord, accessToken, refreshToken } = await UserServcieInstance.modifyUser(id, userDTO);

        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            _id: userRecord._id,
            nickName: userRecord.nickName,
            accessToken: accessToken
        });
    });

    // 사용자 정보 삭제(회원탈퇴)
    route.delete('/:id', async (req, res, next) => {
        const id = req.params.id;

        let UserServcieInstance = new UserServcie();
        await UserServcieInstance.deleteUser(id);
        res.clearCookie('R_AUTH');
        res.status(204).json();
    });
    
}