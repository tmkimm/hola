import sanitizeHtml from 'sanitize-html';

export class StudyService {
    constructor({ studyModel, userModel, notificationModel}) {
        this.studyModel = studyModel;
        this.userModel = userModel;
        this.notificationModel = notificationModel;
    }

    // 메인 화면에서 스터디 리스트를 조회한다.
    async findStudy(offset, limit, sort, language, period, isClosed) {
        const studies = await this.studyModel.findStudy(offset, limit, sort, language, period, isClosed);
        const sortStudies = this.sortLanguageByQueryParam(studies, language);
        return sortStudies;
    }

    // 선택한 언어가 리스트의 앞에 오도록 정렬
    async sortLanguageByQueryParam(studies, language) {
        if( typeof language == 'undefined' )
            return studies;

        const paramLanguage = language.split(',');
        for (let i = 0 ; i < studies.length; i++) {
            studies[i].language.sort(function(a, b) {
                if(paramLanguage.indexOf(b) != -1) return 1;
                else  return -1;
            })
        } 
        return studies;
    }

    // 메인 화면에서 스터디를 추천한다.
    // 4건 이하일 경우 무조건 다시 조회가 아니라, 해당 되는 건은 포함하고 나머지 건만 조회해야함
    async recommendToUserFromMain(userId) {
        let sort, likeLanguages, limit = 20;
        if(userId) {
            let user =await this.userModel.findById(userId);
            likeLanguages = user.likeLanguages;
            sort = 'views';
        }
        else {
            sort = 'totalLikes';
        }

        let studies = await this.studyModel.findStudyRecommend('-views', likeLanguages, null, limit);
        return studies;
    }

    // 글에서 스터디를 추천한다.
    // 4건 이하일 경우 무조건 다시 조회가 아니라, 해당 되는 건은 포함하고 나머지 건만 조회해야함
    async recommendToUserFromStudy(studyId, userId) {
        let sort = '-views', language, limit = 10;
        if(studyId) {
            let study = await this.studyModel.findById(studyId);
            language = study.language;
        }

        let studies = await this.studyModel.findStudyRecommend(sort, language, studyId, userId, limit);
        return studies;
    }

    // 조회수 증가
    async increaseView(studyId, userId, readList) {
        let isAlreadyRead = true;
        let updateReadList = readList;
        
        // 조회수 중복 증가 방지
        if(readList === undefined || (typeof readList === 'string' && readList.indexOf(studyId) == -1)) {
            await this.studyModel.increaseView(studyId); // 조회수 증가    
            if(userId) await this.userModel.addReadList(studyId, userId);    // 읽은 목록 추가
            if(readList === undefined)    updateReadList = `${studyId}`;
            else    updateReadList = `${readList}|${studyId}`;
            isAlreadyRead = false;
        }
        return {updateReadList, isAlreadyRead};
    }
    // 상세 스터디 정보를 조회한다.
    // 로그인된 사용자일 경우 읽은 목록을 추가한다.
    async findStudyDetail(studyId, userId) {
        const studies = await this.studyModel.findById(studyId).populate('author', 'nickName image').populate('comments.author', 'nickName image');
        return studies;
    }

    // 알림을 읽음 표시하고 상세 스터디 정보를 조회한다.
    async findStudyDetailAndUpdateReadAt(studyId, userId) {
        if(userId) {
           await this.notificationModel.updateReadAt(studyId, userId);
        }
        return await this.findStudyDetail(studyId, userId);
    }

    // 사용자의 관심 등록 여부를 조회한다.
    async findUserLiked(studyId, userId) {
        if(userId && studyId) {
            const studies = await this.studyModel.find({_id : studyId, likes : userId});
            let isLiked = studies.length > 0 ? true : false;
            return isLiked;
        } else {
            return false;
        }
    }

    // 스터디의 관심 등록한 사용자 리스트를 조회한다.
    async findLikeUsers(studyId) {
        if(studyId) {
            const likeUsers = await this.studyModel.findById(studyId).select('likes');
            return likeUsers.likes;
        } else {
            return [];
        }
    }

    // 신규 스터디를 등록한다.
    async registerStudy(userID, study) {
        study.author = userID;
        if(study.content) {
            let cleanHTML = sanitizeHtml(study.content, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
              });
            study.content = cleanHTML;
        }
        const studyRecord = await this.studyModel.create(study);
        return studyRecord;
    }

    // 스터디 정보를 수정한다.
    async modifyStudy(id, tokenUserId, study) {
        await this.studyModel.checkStudyAuthorization(id, tokenUserId);    // 접근 권한 체크
        if(study.content) {
            let cleanHTML = sanitizeHtml(study.content, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
              });
            study.content = cleanHTML;
        }
        const studyRecord = await this.studyModel.modifyStudy(id, study);
        return studyRecord;
    }

    // 스터디를 삭제한다.
    async deleteStudy(id, tokenUserId) {
        await this.studyModel.checkStudyAuthorization(id, tokenUserId);    // 접근 권한 체크
        await this.studyModel.deleteStudy(id);
       await this.notificationModel.deleteNotificationByStudy(id);   // 글 삭제 시 관련 알림 제거
    }

    // 관심 등록 추가  
    async addLike(studyId, userId) {
        const {study, isLikeExist} = await this.studyModel.addLike(studyId, userId);
        if(!isLikeExist) {
           await this.userModel.addLikeStudy(studyId, userId);
           //await this.notificationModel.registerNotification(studyId, study.author, userId, 'like');   // 알림 등록
        }
        return study;
    }

    // 관심 등록 취소(삭제)
    async deleteLike(studyId, userId) {
        const study = await this.studyModel.deleteLike(studyId, userId);
       await this.userModel.deleteLikeStudy(studyId, userId);
       //await this.notificationModel.deleteNotification(studyId, study.author, userId, 'like');   // 알림 삭제
        return study;
    }
}