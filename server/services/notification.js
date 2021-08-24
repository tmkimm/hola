import { Notification } from '../models/Notification.js';

export class NotificationService {

    // 내 알림을 조회한다.
    async findMyNotice(author) {
        const notice = await Notification.findMyNotifications(author);
        return notice;
    }

    // 읽지 않은 알림 수를 조회한다.
    async findUnReadCount(author) {
        const notice = await Notification.findUnReadCount(author);
        return notice;
    }

}