import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import AppProvider from "./AppProvider";
import AppMessage from "../AppMessage";
import AppProgress from "../AppProgress";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN, LOGGED_IN } from "../../Routes/Login/LoginQueries.local";
import User from "../User";


const App = ({
  data: {auth: { isLoggedIn }}
}: any) => {
  return (
    <AppProvider>
      <AppPresenter isLoggedIn={isLoggedIn}/>
      <AppMessage/>
      <AppProgress text={"Loading"}/>
    </AppProvider>    
  );
}

const AppPresenter: React.FC<{isLoggedIn: boolean}> = ({isLoggedIn}) => (
  <BrowserRouter>
      { isLoggedIn ? <User><LoggedIn/></User>: <LoggedOut/> }
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

export default graphql<any, any>(IS_LOGGED_IN)(App);