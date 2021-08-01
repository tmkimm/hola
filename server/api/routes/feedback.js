import { Router } from 'express'; 
import { FeedbackService } from '../../services/index.js';

const route = Router();

export default (app) => {
    /*
    스터디에 관련된 Router를 정의한다.
    등록 / 수정 / 삭제하려는 사용자의 정보는 Access Token을 이용하여 처리한다.
    */
  app.use('/feedback', route);

  // 피드백 등록 
  route.post('/', async function(req, res, next) {
      const { rating, content } = req.body;

      let FeedbackServiceInstance = new FeedbackService();
      const feedback = await FeedbackServiceInstance.registerFeedback(rating, content);       
      res.status(201).json(feedback);
  });
}