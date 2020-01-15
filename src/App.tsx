import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Routes/Home";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={"/"} component={Home} exact/>
      <Redirect to={"/"} from={"*"}/>
    </Switch>
  </BrowserRouter>
);

export default App;