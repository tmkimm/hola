class Study {
  constructor(httpClient) {
    this.study = httpClient;
  }

  getList = async (query) => {
    try {
      const studyList = await this.study.get("study", {
        params: {
          sort: query,
          offset: 0,
          limit: 20,
        },
      });
      return studyList;
    } catch (error) {
      console.error(error);
    }
  };
}

export default Study;
