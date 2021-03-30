import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./page/main/main";
import PostList from "./page/postList/postList";
import PostRegister from "./page/postRegister/postRegister";
import Setting from "./page/setting/setting";
import GithubLogin from "./page/auth/githubLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByRefreshToken } from "./store/user";

/* 

App component 

로그인한 User 정보가 있으면 user 정보를 set 하고
적절한 component로 routing을 진행합니다.

react-cookie를 사용하려 했으나 refresnToken이 httpOnly라서
일단은 큰 상관 없는걸로...

*/

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.nickName !== undefined) {
      // 유저가 존재하면 return
      console.log("user가 있어서 return합니다! user 정보 : ", user);
      return;
    }
    dispatch(fetchUserByRefreshToken()).then((response) => {
      // 유저 미존재시 refresh token을 이용해서 유저정보 얻어옴
      console.log("fetchByuserRefreshToken response :", response);
      // 실패했을때 에러처리 필요할 듯
    });
  }, [user, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/main"]}>
          <Main />
        </Route>
        <Route path="/list">
          <PostList />
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
    </Router>
  );
}

export default App;
