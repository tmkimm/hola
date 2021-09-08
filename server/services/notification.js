export class NotificationService {

    constructor({ notificationModel }) {
        this.notificationModel = notificationModel;
    }

    // 내 알림을 조회한다.
    async findMyNotice(author) {
        const notice = await this.notificationModel.findMyNotifications(author);
        return notice;
    }

    // 읽지 않은 알림 수를 조회한다.
    async findUnReadCount(author) {
        const notice = await this.notificationModel.findUnReadCount(author);
        return notice;
    }

}