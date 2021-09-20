import { Router } from 'express';
import { UserService, NotificationService } from '../../services/index.js';
import { nickNameDuplicationCheck, isAccessTokenValid, isUserIdValid } from '../middlewares/index.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { Study as studyModel } from '../../models/Study.js';
import { User as userModel} from '../../models/User.js';
import { Notification as notificationModel} from '../../models/Notification.js';
const route = Router();

export default (app) => {
    app.use('/users', route);
    
    // s3 pre-sign url 발급
    route.post('/sign', asyncErrorWrapper(async (req, res, next) => {
        const { fileName } = req.body;
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const signedUrlPut = await UserServiceInstance.getPreSignUrl(fileName);

        res.status(200).json({
            preSignUrl: signedUrlPut
        });
    }));
      
    // 사용자 정보 조회
    route.get('/', asyncErrorWrapper(async (req, res, next) => {
        const { nickName } = req.query;
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const user = await UserServiceInstance.findByNickName(nickName);

        res.status(200).json(user);
    }));

    // 사용자 정보 상세 보기
    route.get('/:id', isUserIdValid, asyncErrorWrapper(async (req, res, next) => {
        const id = req.params.id;
        
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const user = await UserServiceInstance.findById(id);

        res.status(200).json(user);
    }));

    // 사용자 정보 수정
    route.patch('/:id', isUserIdValid, isAccessTokenValid, nickNameDuplicationCheck, asyncErrorWrapper(async (req, res, next) => {
        const id = req.params.id;
        const tokenUserId = req.user._id;
        const userDTO = req.body;
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const { userRecord, accessToken, refreshToken } = await UserServiceInstance.modifyUser(id, tokenUserId, userDTO);

        res.cookie("R_AUTH", refreshToken, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
        });
        
        return res.status(200).json({
            _id: userRecord._id,
            nickName: userRecord.nickName,
            image: userRecord.image,
            accessToken: accessToken,
            isExists: false
        });
    }));


    // 사용자 닉네임 중복 체크
    route.get('/:id/exists', nickNameDuplicationCheck, asyncErrorWrapper(async (req, res, next) => {
        return res.status(200).json({
            isExists: false
        });
    }));

    // 사용자 정보 삭제(회원탈퇴)
    route.delete('/:id', isUserIdValid, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const id = req.params.id;
        const tokenUserId = req.user._id;

        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        await UserServiceInstance.deleteUser(id, tokenUserId);
        res.clearCookie('R_AUTH');
        res.status(204).json();
    }));

    // 사용자 관심 등록 리스트 조회
    route.get('/likes/:id', isUserIdValid, isAccessTokenValid, async (req, res, next) => {
        const id = req.params.id;
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const user = await UserServiceInstance.findUserLikes(id);
        res.status(200).json(user);
    });

    // 사용자 읽은 목록  조회
    route.get('/read-list/:id', isUserIdValid, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const id = req.params.id;
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const user = await UserServiceInstance.findReadList(id);

        res.status(200).json(user);
    }));

    // 사용자 작성 글 목록 조회
    route.get('/myStudies/:id', isUserIdValid, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const id = req.params.id;
        let UserServiceInstance = new UserService({studyModel, userModel, notificationModel});
        const user = await UserServiceInstance.findMyStudies(id);

        res.status(200).json(user);
    }));

    // 사용자 알림 목록 조회
    route.get('/notifications/:id', asyncErrorWrapper(async (req, res, next) => {
        const id = req.params.id;
        let NotificationServcieInstance = new NotificationService({notificationModel});
        const notice = await NotificationServcieInstance.findMyNotice(id);
        res.status(200).json(notice);
    }));
    
}