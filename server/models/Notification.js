import mongoose from 'mongoose'; 

const notificationSchema = mongoose.Schema({
    targetUserId      : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},     // 대상자 정보
    generateUserId      : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  // 사용자 정보
    generateObjectId      : {type: mongoose.Schema.Types.ObjectId},  // 알림 대상 Object Id
    studyId      : {type: mongoose.Schema.Types.ObjectId, ref: 'Study'},   // 스터디 ID
    readAt       : Date,                                                   // 읽은 시간
    isRead       : {type: Boolean, default: false},
    noticeCode  : String,
    noticeType  : String
},
{
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

// 내 알림 조회
notificationSchema.statics.findMyNotifications = async function(targetUserId) {
    let limit = 5;
    const unReadCount = await Notification.countDocuments({targetUserId, isRead: false});
    if(unReadCount >= 6) 
        limit = unReadCount;

    return await Notification.find({targetUserId: targetUserId})
    .populate('generateUserId', 'nickName')
    .populate({path: 'studyId', match: { isDeleted: false }, select: 'title'})
    .sort('+isRead -createdAt')
    .limit(limit)
    .lean();
}

// 읽지 않은 알림 수 조회
notificationSchema.statics.findUnReadCount = async function(targetUserId) {
    const unReadCount = await Notification.countDocuments({targetUserId, isRead: false});
    return unReadCount;
}

// 신규 알림 등록
// like : 좋아요, comment : 댓글, reply: 대댓글
notificationSchema.statics.registerNotification = async function(studyId, targetUserId, generateUserId, noticeType, generateObjectId) {
    const isNoticeExist = await Notification.findOne({ studyId: studyId, generateObjectId: generateObjectId });
    if (!isNoticeExist && targetUserId != generateUserId) {
        let noticeCode = noticeType == 'like' ? '0' : noticeType == 'comment' ? '1' : noticeType == 'reply' ? '2' : '';
        await Notification.create({ targetUserId, generateUserId, studyId, noticeCode, noticeType, generateObjectId});
    }
}

// 알림 삭제
notificationSchema.statics.deleteNotification = async function(generateObjectId) {
    await Notification.deleteMany({generateObjectId});
}

// 글 삭제 시 관련 알림 제거
notificationSchema.statics.deleteNotificationByStudy = async function(studyId) {
    await Notification.deleteMany({studyId: studyId});
}

// 회원 탈퇴 시 관련 알림 제거
notificationSchema.statics.deleteNotificationByUser = async function(userId) {
    await Notification.deleteMany({ $or: [{targetUserId: userId}, {generateUserId: userId}]});
}

// 알림 읽음 처리
notificationSchema.statics.updateReadAt = async function(studyId, userId) {
    await Notification.updateMany(
    {
        studyId: studyId,
        targetUserId: userId,
        readAt: null
    }, 
    {
        readAt: new Date().toISOString(),
        isRead: true
    });
}


const Notification = mongoose.model('Notification', notificationSchema);

export { Notification };