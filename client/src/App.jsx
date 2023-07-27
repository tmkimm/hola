import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingSpinner from 'component/loading/loadingSpinner';
import Modal from 'component/modal/modal_component/modal';
import Study from './page/study/study';
import Mypage from 'page/myPage';

const Main = lazy(() => import('./page/main/main'));
const PostRegister = lazy(() => import('./page/post_register/postRegister'));
const GithubLogin = lazy(() => import('./page/auth/githubLogin'));
const MyPosts = lazy(() => import('./page/my_posts/myPosts'));
const MyLikes = lazy(() => import('./page/my_likes/myLikes'));
const SettingContainer = lazy(() => import('./component/setting_container/settingContainer'));
const NotFound = lazy(() => import('./page/notFound/notFound'));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <Modal visible={true} name='loading'>
            <LoadingSpinner />
          </Modal>
        }
      >
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
          <Route path='/settings'>
            <Mypage />
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
      </Suspense>
    </Router>
  );
};

export default App;
