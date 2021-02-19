import styles from "./App.module.css";
import { useEffect, useState } from "react";
import StudyList from "./component/study_list/studyList";
import Navbar from "./component/nav_bar/navbar";

function App({ study }) {
  const [popularStudyList, setPopularStudyList] = useState([]);
  const [recentStudyList, setRecentStudyList] = useState([]);

  useEffect(() => {
    study //
      .getList("-createdAt")
      .then((response) => {
        setRecentStudyList(response.data);
      })
      .catch(console.error);

    study //
      .getList("+views")
      .then((response) => {
        setPopularStudyList(response.data);
      })
      .catch(console.error);
  }, [study]);

  const onStudyClick = () => {
    console.log("clicked!");
  };

  return (
    <div className={styles.app}>
      <Navbar></Navbar>
      <main className={styles.main}>
        <h1 className={styles.title}>가장 인기있는 글이에요!</h1>
        <StudyList
          onStudyClick={onStudyClick}
          studyList={popularStudyList}
        ></StudyList>
        <h1 className={styles.title}>지금 올라왔어요!</h1>
        <StudyList
          onStudyClick={onStudyClick}
          studyList={recentStudyList}
        ></StudyList>
      </main>
    </div>
  );
}

export default App;
