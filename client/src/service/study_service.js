import httpClient from "./http_client";
import { getFormatedToday } from "../common/utils";

/*
글 등록, 삭제, 수정, 조회 등 study 글 관련 api를 모아놓은 class입니다.
to-do
*/
class Study {
  constructor() {
    this.study = httpClient;
  }

  getList = async (query, selectedLanguages) => {
    try {
      const params = {
        sort: query,
        offset: 0,
        limit: 20,
      };

      if (selectedLanguages.length !== 0) {
        // 선택된 language가 있으면 language 속성 추가
        const qs = selectedLanguages.map((language) => language).join(",");
        params.language = qs;
      }

      const studyList = await this.study.get("studies", {
        params,
      });
      return studyList;
    } catch (error) {
      console.error(error);
    }
  };

  getDetail = async (id) => {
    try {
      const response = await this.study.get(`studies/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  register = async ({ title, content, language }) => {
    try {
      const response = await this.study.post("studies", {
        title,
        content,
        language,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  modify = async (id, title, content, language) => {
    try {
      const response = await this.study.patch(`studies/${id}`, {
        title,
        content,
        language,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  deleteStudy = async (id) => {
    try {
      await this.study.delete(`studies/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 스터디의 댓글 리스트 조회
  getComments = async (id) => {
    try {
      const response = await this.study.get(`studies/comments/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // 신규 댓글 등록
  registerComment = async ({ id, content }) => {
    try {
      const response = await this.study.post("studies/comments", {
        studyId: id,
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
      const response = await this.study.patch(`studies/comments/${id}`, {
        content,
      });
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
      //console.log("error from console.log", error);
      //return
    }
  };

  // 댓글 삭제
  deleteComment = async ({ id }) => {
    try {
      await this.study.delete(`studies/comments/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  addLikes = async (studyId) => {
    try {
      console.log("studyId : " + studyId);
      const response = await this.study.post("studies/likes", {
        studyId,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  deleteLikes = async (studyId) => {
    console.log("delete likes, studyid : " + studyId);
    try {
      await this.study.delete(`studies/likes/${studyId}`);
    } catch (error) {
      console.error(error);
    }
  };

  /* users/sign 말고 studies/sign 어떤가? */
  getPresignedUrl = async (userName) => {
    try {
      const fileName = `${userName}_${getFormatedToday()}.png`;
      const response = await this.study.post("users/sign", {
        fileName,
      });
      return { preSignedUrl: response.data.preSignUrl, fileName };
    } catch (error) {
      console.error(error);
    }
  };

  uploadImageToS3 = async (presignedUrl, file) => {
    console.log("presigend URL IS !!!!", presignedUrl);
    const response = await fetch(
      new Request(presignedUrl, {
        method: "PUT",
        body: file,
        headers: new Headers({
          "Content-Type": "image/png",
        }),
      })
    );
    console.log("response!!!", response);
    if (response.status !== 200) {
      // The upload failed, so let's notify the caller.
      //onError();
      console.log("error occured!");
      return;
    }
    return "hehe success";
  };

  uploadImageToS3WithBase64 = async (presignedUrl, file, fileName) => {
    console.log("=======at base64==========");
    console.log("pre : ", presignedUrl);
    console.log("fileName: ", fileName);
    console.log("=======at base64==========");
    let arr = file.split(","),
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
