import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import studyService from '../../../service/study_service';

const useStudySearch = (category, pageNumber, setPageNumber, checked) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [studyList, setStudyList] = useState([]);
  const selectedLanguages = useSelector((state) => state.language);
  const [currentLanguage, setCurrentLanguage] = useState([]);

  useEffect(() => {
    setPageNumber((prev) => 0);
    setStudyList((prev) => []);
    setCurrentLanguage((lang) => [...selectedLanguages]);
  }, [selectedLanguages, setPageNumber, checked]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (currentLanguage.length !== selectedLanguages.length) {
      return;
    }

    studyService
      .getList(category, selectedLanguages, pageNumber, !checked)
      .then((response) => {
        setStudyList((prev) => [...prev, ...response.data]);
        setLoading(false);
        setHasMore(response.data.length > 0);
      })
      .catch((e) => {
        setError(true);
      });
  }, [category, pageNumber, selectedLanguages, currentLanguage.length, checked]);

  return { loading, error, studyList, hasMore };
};

export default useStudySearch;
