import { Router } from 'express';
import { UserServcie } from '../../services/index.js';
import { nickNameDuplicationCheck, isAccessTokenValid } from '../middlewares/index.js'
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
    route.patch('/:id', isAccessTokenValid, nickNameDuplicationCheck, async (req, res, next) => {
        const id = req.params.id;
        const userDTO = req.body;
        let UserServcieInstance = new UserServcie();
        const { userRecord, accessToken, refreshToken } = await UserServcieInstance.modifyUser(id, userDTO);

        res.cookie("R_AUTH", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            _id: userRecord._id,
            nickName: userRecord.nickName,
            image: userRecord.image,
            accessToken: accessToken,
            isExists: false
        });
    });


    // 사용자 닉네임 중복 체크
    route.get('/:id/exists', nickNameDuplicationCheck, async (req, res, next) => {
        return res.status(200).json({
            isExists: false
        });
    });

    // 사용자 정보 삭제(회원탈퇴)
    route.delete('/:id', isAccessTokenValid, async (req, res, next) => {
        const id = req.params.id;

        let UserServcieInstance = new UserServcie();
        await UserServcieInstance.deleteUser(id);
        res.clearCookie('R_AUTH');
        res.status(204).json();
    });

    // 사용자 관심 등록 리스트 조회
    route.get('/likes/:id', async (req, res, next) => {
        const id = req.params.id;
        
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.findUserLikes(id);

        res.status(200).json(user);
    });

    // 사용자 읽은 목록  조회
    route.get('/read-list/:id', async (req, res, next) => {
        const id = req.params.id;
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.findReadList(id);

        res.status(200).json(user);
    });

    // 사용자 작성 글 목록 조회
    route.get('/myStudies/:id', async (req, res, next) => {
        const id = req.params.id;
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.findMyStudies(id);

        res.status(200).json(user);
    });
    
}