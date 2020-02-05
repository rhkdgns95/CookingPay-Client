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
import MyPage from "../../Routes/MyPage";
import FindAccount from "../../Routes/FindAccount";

export const CloudinaryName: string = "dljwleqvc";
export const CloudinaryType: string = "image";
export const CloudinaryApiKey: string = "347663746347357";
export const CloudinaryPreset: string = "hreon3pm";
export const CloudinaryURL: string = `https://api.cloudinary.com/v1_1/${CloudinaryName}/${CloudinaryType}/upload`;
export const CloudinaryDestroyURL: string = `https://api.cloudinary.com/v1_1/${CloudinaryName}/${CloudinaryType}/destroy`;

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
        { isLoggedIn ? <User isLoggedIn={isLoggedIn}><LoggedIn/></User>: <LoggedOut/> }
    </BrowserRouter>
  );
};

const LoggedIn = () => (
    <Switch>
      <Route path={"/"} component={Home} exact />
      <Route path={"/post"} component={Post} />
      <Route path={"/my-page"} component={MyPage} />
      <Redirect to={"/"} from={"*"} />
    </Switch>
);

const LoggedOut = () => (
  <Switch>
    <Route path={"/"} component={Login} exact/>
    <Route path={"/find-account"} component={FindAccount} />
    <Route path={"/signup"} component={SignUp} />
    <Redirect to={"/"} from={"*"} />
  </Switch>
);

export default graphql<any, any>(IS_LOGGED_IN)(App);