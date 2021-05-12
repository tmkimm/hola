import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./page/main/main";
import PostRegister from "./page/postRegister/postRegister";
import Setting from "./page/setting/setting";
import GithubLogin from "./page/auth/githubLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByRefreshToken } from "./store/user";

/* 

App component 

로그인한 User 정보가 있으면 user 정보를 set 하고
적절한 component로 routing을 진행합니다.

to-do
-> localStorage에 user를 저장하자!!
-> access token은 날아가는데 refresh token은 왜 남아있지? 둘다 header에 저장 아닌가?
-> 새 글쓰기 같은 버튼에서 access token 여부를 check할 수 있나?
-> 결론적으로는 ssr을 적용해야하나?
-> 생각하는 방법은 index.js에서 fetchUserByRefreshToken씀
-> 성공시 user, localStorage set. 
-> 실패시 user초기화, localStorage 초기화?
-> fetchByRefreshToken의 정확한 용도를 알아야될듯..!
-> access token 없을때 계속 써야할텐데, user 있으면 그냥 setting 하면 되지않나?
*/

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    /*
    console.log("#########APP RERENDERING!!!###############");
    if (user.nickName !== undefined) {
      // 유저가 존재하면 return
      console.log("user가 있어서 return합니다! user 정보 : ", user);
      return;
    }
    dispatch(fetchUserByRefreshToken()).then((response) => {
      // 유저 미존재시 refresh token을 이용해서 유저정보 얻어옴
      // page refresh시에 access token 날아감
      console.log("fetchByuserRefreshToken response :", response);
      // 실패했을때 에러처리 필요할 듯
    }); */
  }, [user, dispatch]);

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
    </Router>
  );
};

export default App;
