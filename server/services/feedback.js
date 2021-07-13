import { Feedback } from '../models/Feedback.js';

export class FeedbackService {
    // 신규 스터디를 등록한다.
    async registerFeedback(rating, content) {
        const feedbackRecord = await Feedback.create({
            rating,
            content
        });
        return feedbackRecord;
    }
}