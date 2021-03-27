import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./page/main/main";
import PostList from "./page/postList/postList";
import PostRegister from "./page/postRegister/postRegister";
import Setting from "./page/setting/setting";
import GithubLogin from "./page/auth/githubLogin";
import { useCookies } from "react-cookie";
import authService from "./service/auth_service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user";

function App() {
  const user = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies(["R_AUTH"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.nickName !== undefined) {
      console.log("user가 있어서 return합니다! user 정보 : ", user);
      return;
    }

    authService.getUserInfo().then((user) => {
      console.log(user.data.userNickName);
      const userInfo = {
        nickName: user.data.nickName,
        id: user.data._id,
      };
      console.log(userInfo);
      dispatch(setUser(userInfo));
    });
    /*
    if (cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
      setIsRemember(true);
    }
    */
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
