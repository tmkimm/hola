import { Router } from 'express'; 
import { checkStudy, isStudyValid, isAccessTokenValid, getUserIdByAccessToken, isStudyIdValid } from '../middlewares/index.js';
import { StudyService } from '../../services/index.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { Study as studyModel } from '../../models/Study.js';
import { User as userModel} from '../../models/User.js';
import { Notification as notificationModel} from '../../models/Notification.js';

const route = Router();

export default (app) => {
    /*
    스터디에 관련된 Router를 정의한다.
    등록 / 수정 / 삭제하려는 사용자의 정보는 Access Token을 이용하여 처리한다.
    
    # GET /studies : 스터디 리스트 조회(pagenation, sort, query select)
    # POST /studies/ : 신규 스터디 등록
    # GET /studies/:id : 스터디 상세 정보 조회
    # PATCH /studies/:id : 스터디 정보 수정
    # DELETE /studies/:id : 스터디 삭제

    # POST /studies/likes : 좋아요 등록
    # DELETE /studies/likes/:id : 좋아요 삭제
    */
  app.use('/studies', route);
  
  // 스터디 리스트 조회
  route.get('/', asyncErrorWrapper(async (req, res, next) => {
    const { offset, limit, sort, language, period, isClosed } = req.query;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const studies = await StudyServiceInstance.findStudy(offset, limit, sort, language, period, isClosed);
    res.status(200).json(studies);
  }));

  // 메인에서의 스터디 추천
  route.get('/recommend', getUserIdByAccessToken, asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user._id;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const studies = await StudyServiceInstance.recommendToUserFromMain(userId);

    res.status(200).json(studies);
  }));

  // 글에서의 스터디 추천
  route.get('/:id/recommend', getUserIdByAccessToken, asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id;
    const userId = req.user._id;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const study = await StudyServiceInstance.recommendToUserFromStudy(studyId, userId);

    res.status(200).json(study);
  }));

  // 스터디 상세 보기
  // 로그인된 사용자일 경우 읽은 목록을 추가한다.
  route.get('/:id', isStudyIdValid, getUserIdByAccessToken, asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id;
    const userId = req.user._id;
    let readList = req.cookies.RVIEW;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const study = await StudyServiceInstance.findStudyDetail(studyId, userId);
    const { updateReadList, isAlreadyRead} = await StudyServiceInstance.increaseView(studyId, userId, readList);
    if(!isAlreadyRead) {
      // 쿠키는 당일만 유효
      let untilMidnight = new Date();
      untilMidnight.setHours(24, 0, 0, 0);
      res.cookie("RVIEW", updateReadList, {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        expires: untilMidnight
      });
    }

    res.status(200).json(study);
  }));

  // 알림을 통한 스터디 상세 보기
  route.get('/:id/notice', isStudyIdValid, getUserIdByAccessToken, asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id;
    const userId = req.user._id;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const study = await StudyServiceInstance.findStudyDetailAndUpdateReadAt(studyId, userId);

    res.status(200).json(study);
  }));

  // 사용자의 스터디 관심 등록 여부
  route.get('/:id/isLiked', getUserIdByAccessToken, asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id;
    const userId = req.user._id;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const isLiked = await StudyServiceInstance.findUserLiked(studyId, userId);

    res.status(200).json({
      isLiked
    });
  }));

  // 글의 관심 등록한 사용자 리스트 조회
  route.get('/:id/likes', asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id;
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const likeUsers = await StudyServiceInstance.findLikeUsers(studyId);

    res.status(200).json({
      likeUsers
    });
  }));

  // 스터디 등록 
  route.post('/', checkStudy, isStudyValid, isAccessTokenValid, asyncErrorWrapper(async function(req, res, next) {
    try {
      const studyDTO = req.body;
      const userId = req.user._id;

      let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
      const study = await StudyServiceInstance.registerStudy(userId, studyDTO);       
      res.status(201).json(study);
    } catch (error) {
      res.status(400).json({ errors: [
        {
          location: 'body',
          param: 'name',
          error: 'TypeError',
          message: 'must be String'
        }
      ], error }); 
    }
  }));

  // 스터디 수정
  route.patch('/:id', isAccessTokenValid, checkStudy, isStudyValid, asyncErrorWrapper(async (req, res, next) => { 
    const id = req.params.id;
    const tokenUserId = req.user._id;
    const studyDTO = req.body;

    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const study = await StudyServiceInstance.modifyStudy(id, tokenUserId, studyDTO);

    res.status(200).json(study);  
  }));

  // 스터디 글 삭제
  route.delete('/:id', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
    const id = req.params.id;
    const tokenUserId = req.user._id;

    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    await StudyServiceInstance.deleteStudy(id, tokenUserId);
    res.status(204).json();
  }));

  // 좋아요 등록
  route.post('/likes', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
    const { studyId } = req.body;
    const userId = req.user._id;
    
    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const study = await StudyServiceInstance.addLike(studyId, userId);

    return res.status(201).json({likeUsers: study.likes});
  }));

  // 좋아요 삭제
  route.delete('/likes/:id', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id; // 사용자 id
    const userId = req.user._id;

    let StudyServiceInstance = new StudyService({studyModel, userModel, notificationModel});
    const study = await StudyServiceInstance.deleteLike(studyId, userId);
    res.status(201).json({likeUsers: study.likes});
  }));
}