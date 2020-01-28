import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import AppProvider from "./AppProvider";
import AppMessage from "../AppMessage";
import AppProgress from "../AppProgress";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "../../Routes/Login/LoginQueries.local";
import User from "../User";
import Post from "../../Routes/Post";
import SignUp from "../../Routes/SignUp";
import { SUBSCRIPTION_PUBLIC_MESSAGE } from "../PublicChatRoom/PublicChatRoomQueries";

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

const AppPresenter: React.FC<{isLoggedIn: boolean}> = ({isLoggedIn}) => {
  console.log("isLogged in ?  : ", isLoggedIn)
  return (
    <BrowserRouter>
        { isLoggedIn ? <User><LoggedIn/></User>: <LoggedOut/> }
    </BrowserRouter>
  );
};

const LoggedIn = () => (
    <Switch>
      <Route path={"/"} component={Home} exact />
      <Route path={"/post"} component={Post} />
      <Redirect to={"/"} from={"*"} />
    </Switch>
);

const LoggedOut = () => (
  <Switch>
    <Route path={"/"} component={Login} exact/>
    <Route path={"/signup"} component={SignUp} />
    <Redirect to={"/"} from={"*"} />
  </Switch>
);

export default graphql<any, any>(IS_LOGGED_IN)(App);