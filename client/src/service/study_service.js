import httpClient from './http_client';
import { getFormatedToday } from 'common/utils';

/*
글 등록, 삭제, 수정, 조회 등 study 글 관련 api를 모아놓은 class입니다.
to-do
*/
class Study {
  constructor() {
    this.study = httpClient;
  }

  getList = async (category, selectedLanguages, position, pageNumber, checked) => {
    const queryType = { all: 0, project: 1, study: 2 };
    try {
      const params = {
        sort: '-createdAt',
        offset: pageNumber,
        limit: 20,
        isClosed: checked,
        type: queryType[category],
        position,
      };

      if (selectedLanguages.length !== 0) {
        // 선택된 language가 있으면 language 속성 추가
        const qs = selectedLanguages.map((language) => language).join(',');
        params.language = qs;
      }

      const studyList = await this.study.get('posts', {
        params,
      });

      return studyList;
    } catch (error) {
      console.error(error);
    }
  };

  getDetail = async (id) => {
    try {
      const response = await this.study.get(`posts/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getRecommendedPost = async (id) => {
    try {
      const response = await this.study.get(`posts/${id}/recommend`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
  register = async ({
    title,
    content,
    language,
    startDate,
    type,
    recruits,
    onlineOrOffline,
    contactType,
    contactPoint,
    expectedPeriod,
    positions,
  }) => {
    try {
      const response = await this.study.post('posts', {
        title,
        content,
        language,
        startDate,
        type,
        recruits,
        onlineOrOffline,
        contactType,
        contactPoint,
        expectedPeriod,
        positions,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  modify = async ({
    postId,
    title,
    content,
    language,
    startDate,
    type,
    recruits,
    onlineOrOffline,
    contactType,
    contactPoint,
    expectedPeriod,
    positions,
  }) => {
    try {
      const response = await this.study.patch(`posts/${postId}`, {
        title,
        content,
        language,
        startDate,
        type,
        recruits,
        onlineOrOffline,
        contactType,
        contactPoint,
        expectedPeriod,
        positions,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  editClose = async (id, isClosed) => {
    try {
      const response = await this.study.patch(`posts/${id}`, {
        isClosed,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  deleteStudy = async (id) => {
    try {
      await this.study.delete(`posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 스터디의 댓글 리스트 조회
  getComments = async (id) => {
    try {
      const response = await this.study.get(`posts/comments/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // 신규 댓글 등록
  registerComment = async ({ id, content }) => {
    try {
      const response = await this.study.post('posts/comments', {
        postId: id,
        content,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 수정
  modifyComment = async ({ id, content }) => {
    try {
      const response = await this.study.patch(`posts/comments/${id}`, {
        content,
      });
      return response;
    } catch (error) {
      return error.response.status;
    }
  };

  // 댓글 삭제
  deleteComment = async ({ id }) => {
    try {
      await this.study.delete(`posts/comments/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  addLikes = async (postId) => {
    try {
      const response = await this.study.post('posts/likes', {
        postId,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  deleteLikes = async (postId) => {
    try {
      const response = await this.study.delete(`posts/likes/${postId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getLikesUser = async (postId) => {
    try {
      const response = await this.study.get(`posts/${postId}/likes`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  /* users/sign 말고 posts/sign 어떤가? */
  getPresignedUrl = async (userName) => {
    try {
      const fileName = `${userName}_${getFormatedToday()}.png`;
      const response = await this.study.post('users/sign', {
        fileName,
      });
      return { preSignedUrl: response.data.preSignUrl, fileName };
    } catch (error) {
      console.error(error);
    }
  };

  uploadImageToS3 = async (presignedUrl, file) => {
    const response = await fetch(
      new Request(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: new Headers({
          'Content-Type': 'image/png',
        }),
      }),
    );

    if (response.status !== 200) {
      // The upload failed, so let's notify the caller.
      //onError();
      console.log('error occured!');
      return;
    }
    return 'hehe success';
  };

  uploadImageToS3WithBase64 = async (presignedUrl, file, fileName) => {
    let arr = file.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const imageFile = new File([u8arr], fileName, { type: mime });
    const response = await this.uploadImageToS3(presignedUrl, imageFile);
    return response;
  };
}

const studyService = new Study(httpClient);
export default studyService;
