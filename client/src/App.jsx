import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./page/main/main";
import PostList from "./page/postList/postList";
import PostRegister from "./page/postRegister/postRegister";
import Setting from "./page/setting/setting";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/main"]}>
          <Main />
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
