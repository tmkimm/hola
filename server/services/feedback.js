export class FeedbackService {

    constructor({ feedbackModel }) {
        this.feedbackModel = feedbackModel;
    }

    // 신규 스터디를 등록한다.
    async registerFeedback(rating, content) {
        const feedbackRecord = await this.feedbackModel.create({
            rating,
            content
        });
        return feedbackRecord;
    }
}