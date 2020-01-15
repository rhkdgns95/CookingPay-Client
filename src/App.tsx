import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";

const App = () => (
  <BrowserRouter>
      { false ? <LoggedIn/>: <LoggedOut/> }
  </BrowserRouter>
);

const LoggedIn = () => (
    <Switch>
      <Route path={"/"} component={Home} exact />
      <Redirect to={"/"} from={"*"} />
    </Switch>
);

const LoggedOut = () => (
  <Switch>
    <Route path={"/"} component={Login} exact/>
    <Redirect to={"/"} from={"*"} />
  </Switch>
);

export default App;