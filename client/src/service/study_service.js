class Study {
  constructor(httpClient) {
    this.study = httpClient;
  }

  getList = async () => {
    try {
      const studyList = await this.study.get();
      return studyList;
    } catch (error) {
      console.error(error);
    }
  };
}

export default Study;
