import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './page/main/main';
import PostRegister from './page/post_register/postRegister';
import GithubLogin from './page/auth/githubLogin';
import Study from './page/study/study';
import MyPosts from './page/my_posts/myPosts';
import MyLikes from './page/my_likes/myLikes';
import SettingContainer from './component/setting_container/settingContainer';
import NotFound from './page/notFound/notFound';

/* 

App component 

로그인한 User 정보가 있으면 user 정보를 set 하고
적절한 component로 routing을 진행합니다.

*/

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/main']}>
          <Main />
        </Route>
        <Route path='/register'>
          <PostRegister />
        </Route>
        <Route path='/setting'>
          <SettingContainer />
        </Route>
        <Route path='/study'>
          <Study />
        </Route>
        <Route path='/myPosts'>
          <MyPosts />
        </Route>
        <Route path='/myLikes'>
          <MyLikes />
        </Route>
        <Route path='/auth/github'>
          <GithubLogin />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
