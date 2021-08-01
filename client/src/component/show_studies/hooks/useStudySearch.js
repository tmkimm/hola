import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import studyService from "../../../service/study_service";

const useStudySearch = (category, pageNumber, setPageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [studyList, setStudyList] = useState([]);
  const selectedLanguages = useSelector((state) => state.language);
  const [lang, setLang] = useState([]);

  useEffect(() => {
    setPageNumber((prev) => 0);
    setStudyList((prev) => []);
    setLang((lang) => [...selectedLanguages]);
  }, [selectedLanguages, setPageNumber]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (lang.length !== selectedLanguages.length) {
      //  console.log("달라서 return합니다");
      return;
    }
    studyService
      .getList(category, selectedLanguages, pageNumber)
      .then((response) => {
        setStudyList((prev) => [...prev, ...response.data]);
        setLoading(false);
        setHasMore(response.data.length > 0);
      })
      .catch((e) => {
        setError(true);
      });
  }, [category, pageNumber, selectedLanguages, lang.length]);

  return { loading, error, studyList, hasMore };
};

export default useStudySearch;
