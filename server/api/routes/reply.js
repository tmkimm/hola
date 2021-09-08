import { Router } from 'express'; 
import { isAccessTokenValid } from '../middlewares/index.js';
import { ReplyService } from '../../services/index.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { Study as studyModel } from '../../models/Study.js';
import { Notification as notificationModel} from '../../models/Notification.js';

const route = Router();

export default (app) => {
    /*
    대댓글에 관련된 Router를 정의한다.
    등록 / 수정 / 삭제하려는 사용자의 정보는 Access Token을 이용하여 처리한다.

    # POST /studies/replies : 신규 대댓글 등록
    # PATCH /studies/replies/:id : 대댓글 정보 수정
    # DELETE /studies/replies/:id : 대댓글 삭제
    */
  app.use('/studies/replies', route);

  // 대댓글 등록
  route.post('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
    const commentDTO = req.body;
    const userId = req.user._id;

    let ReplyServiceInstance = new ReplyService({studyModel, notificationModel});
    const study = await ReplyServiceInstance.registerReply(userId, commentDTO);

    return res.status(201).json(study);
  }));

  // 대댓글 수정
  route.patch('/:id', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
    const commentDTO = req.body;
    commentDTO.id = req.params.id;
    const tokenUserId = req.user._id;

    let ReplyServiceInstance = new ReplyService({studyModel, notificationModel});
    const comment = await ReplyServiceInstance.modifyReply(commentDTO, tokenUserId);

    res.status(200).json(comment);
  }));
  // 대댓글 삭제
  route.delete('/:id', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
    const replyId = req.params.id;
    const userId = req.user._id;

    let ReplyServiceInstance = new ReplyService({studyModel, notificationModel});
    await ReplyServiceInstance.deleteReply(replyId, userId);
    res.status(204).json();
  }));
}