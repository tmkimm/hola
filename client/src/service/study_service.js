class Study {
  constructor(httpClient) {
    this.study = httpClient;
  }

  getList = async (query, selectedLanguages) => {
    try {
      const qs = selectedLanguages.map((language) => language).join(",");
      console.log(qs);
      const studyList = await this.study.get("study", {
        params: {
          sort: query,
          offset: 0,
          limit: 20,
          language: qs,
        },
      });
      return studyList;
    } catch (error) {
      console.error(error);
    }
  };
}

export default Study;
