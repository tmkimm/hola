import httpClient from "./http_client";
import { getFormatedToday } from "../common/utils";

/*

글 등록, 삭제, 수정, 조회 등 study 글 관련 api를 모아놓은 class입니다.

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

  register = async ({ title, body, tags }) => {
    const data = {
      title,
      content: body,
    };
    try {
      const response = await this.study.post("studies", {
        data,
      });
      return response;
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
      return response.data.preSignUrl;
    } catch (error) {
      console.error(error);
    }
  };

  uploadImageToS3 = async (presignedUrl, file) => {
    /*
    try {
      const response = await axios.put(presignedUrl, {
        file,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
    */
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
  };
}

const studyService = new Study(httpClient);
export default studyService;
