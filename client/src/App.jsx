import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingSpinner from 'component/loading/loadingSpinner';
import Modal from 'component/modal/modal_component/modal';
import EventPage from 'page/event';

const Main = lazy(() => import('./page/main/main'));
const PostRegister = lazy(() => import('./page/post_register/postRegister'));
const GithubLogin = lazy(() => import('./page/auth/githubLogin'));
const MyPosts = lazy(() => import('./page/my_posts/myPosts'));
const MyLikes = lazy(() => import('./page/my_likes/myLikes'));
const MyPage = lazy(() => import('./page/myPage'));
const NotFound = lazy(() => import('./page/notFound/notFound'));
const Study = lazy(() => import('./page/study/study'));

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
            <MyPage />
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
          <Route path='/hola-it'>
            <EventPage />
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
