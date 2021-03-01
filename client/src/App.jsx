import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./page/main/main";
import PostList from "./page/postList/postList";
import PostRegister from "./page/postRegister/postRegister";
import Setting from "./page/setting/setting";

function App({ studyService }) {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/main"]}>
          <Main studyService={studyService} />
        </Route>
        <Route path="/list">
          <PostList></PostList>
        </Route>
      </Switch>
      <Route path="/register">
        <PostRegister></PostRegister>
      </Route>
      <Route path="/setting">
        <Setting></Setting>
      </Route>
    </Router>
  );
}

export default App;
