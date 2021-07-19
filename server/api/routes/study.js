import { Router } from 'express'; 
import { checkStudy, isStudyValid, isAccessTokenValid, getUserIdWithAccessToken } from '../middlewares/index.js';
import { StudyService } from '../../services/index.js';

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

    # GET /studies/comments/:id : 스터디의 댓글 리스트 조회
    # POST /studies/comments : 신규 댓글 등록
    # PATCH /studies/comments/:id : 댓글 정보 수정
    # DELETE /studies/comments/:id : 댓글 삭제

    # POST /studies/likes : 좋아요 등록
    # DELETE /studies/likes/:id : 좋아요 삭제
    */
  app.use('/studies', route);
  
  // 스터디 리스트 조회
  route.get('/', async (req, res, next) => {
    const { offset, limit, sort, language } = req.query;
    let StudyServiceInstance = new StudyService();
    const studies = await StudyServiceInstance.findStudy(offset, limit, sort, language);

    res.status(200).json(studies);
  });

  // 메인에서의 스터디 추천
  route.get('/recommend', getUserIdWithAccessToken, async (req, res, next) => {
    const userId = req.user._id;
    const { studyId } = req.query;
    let StudyServiceInstance = new StudyService();
    const studies = await StudyServiceInstance.recommendToUserFromMain(userId, studyId);

    res.status(200).json(studies);
  });

  // 글에서의 스터디 추천
  route.get('/:id/recommend', async (req, res, next) => {
    const studyId = req.params.id;
    let StudyServiceInstance = new StudyService();
    const study = await StudyServiceInstance.recommendToUserFromStudy(studyId);

    res.status(200).json(study);
  });

  // 스터디 상세 보기
  // 로그인된 사용자일 경우 읽은 목록을 추가한다.
  route.get('/:id', getUserIdWithAccessToken, async (req, res, next) => {
    const studyId = req.params.id;
    const userId = req.user._id;
    let StudyServiceInstance = new StudyService();
    const study = await StudyServiceInstance.studyDetailView(studyId, userId);

    res.status(200).json(study);
  });

  // 스터디 등록 
  route.post('/', checkStudy, isStudyValid, isAccessTokenValid, async function(req, res, next) {
    try {
      const studyDTO = req.body;
      const userId = req.user._id;

      let StudyServiceInstance = new StudyService();
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
  });

  // 스터디 수정
  route.patch('/:id', isAccessTokenValid, async (req, res, next) => { 
    const id = req.params.id;
    const studyDTO = req.body;

    let StudyServiceInstance = new StudyService();
    const study = await StudyServiceInstance.modifyStudy(id, studyDTO);

    res.status(200).json(study);  
  });

  // 스터디 글 삭제
  route.delete('/:id', isAccessTokenValid, async (req, res, next) => {
    const id = req.params.id;

    let StudyServiceInstance = new StudyService();
    await StudyServiceInstance.deleteStudy(id);
    res.status(204).json();
  });
  

  // 댓글 리스트 조회
  route.get('/comments/:id', async (req, res, next) => {
    const id = req.params.id;

    let StudyServiceInstance = new StudyService();
    const comments = await StudyServiceInstance.findComments(id);

    res.status(200).json(comments);
  });

  // 댓글 등록
  route.post('/comments', isAccessTokenValid, async (req, res, next) => {
    const commentDTO = req.body;
    const userId = req.user._id;

    let StudyServiceInstance = new StudyService();
    const study = await StudyServiceInstance.registerComment(userId, commentDTO);

    return res.status(201).json(study);
  })

  // 댓글 수정
  route.patch('/comments/:id', isAccessTokenValid, async (req, res, next) => {
    const commentDTO = req.body;
    commentDTO.id = req.params.id;

    let StudyServiceInstance = new StudyService();
    const comment = await StudyServiceInstance.modifyComment(commentDTO);

    res.status(200).json(comment);
  });

  // 댓글 삭제
  route.delete('/comments/:id', isAccessTokenValid, async (req, res, next) => {
    const id = req.params.id;

    let StudyServiceInstance = new StudyService();
    await StudyServiceInstance.deleteComment(id);
    res.status(204).json();
  });

  // 좋아요 등록
  route.post('/likes', isAccessTokenValid, async (req, res, next) => {
    const { studyId } = req.body;
    const userId = req.user._id;
    
    let StudyServiceInstance = new StudyService();
    const study = await StudyServiceInstance.addLike(studyId, userId);

    return res.status(201).json(study);
  });

  // 좋아요 삭제
  route.delete('/likes/:id', async (req, res, next) => {
    const userId = req.params.id; // 사용자 id
    const { studyId } = req.body;

    let StudyServiceInstance = new StudyService();
    await StudyServiceInstance.deleteLike(studyId, userId);
    res.status(204).json();
  });
}