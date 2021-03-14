import httpClient from "./http_client";

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
        const qs = selectedLanguages.map((language) => language).join(",");
        params.language = qs;
      }

      const studyList = await this.study.get("study", {
        params,
      });
      return studyList;
    } catch (error) {
      console.error(error);
    }
  };
}

const studyService = new Study(httpClient);
export default studyService;
