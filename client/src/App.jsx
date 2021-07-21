import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./page/main/main";
import PostRegister from "./page/postRegister/postRegister";
import Setting from "./page/setting/setting";
import GithubLogin from "./page/auth/githubLogin";
import Study from "./page/study/study";

/* 

App component 

로그인한 User 정보가 있으면 user 정보를 set 하고
적절한 component로 routing을 진행합니다.

*/

const App = () => {
  console.log("AppV2!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/main"]}>
          <Main />
        </Route>
      </Switch>
      <Route path="/register">
        <PostRegister />
      </Route>
      <Route path="/setting">
        <Setting />
      </Route>
      <Route path="/auth/github">
        <GithubLogin />
      </Route>
      <Route path="/study">
        <Study />
      </Route>
    </Router>
  );
};

export default App;
