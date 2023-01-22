import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ServerPage from "./components/ServerIndexItem";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";
import About from "./components/AboutUs";
import { authenticate } from "./store/session";
import ChannelIndex from "./components/ChannelIndexItem";
import DmBar from "./components/Message/allDms";
import DmPage from "./components/Message/theDm";
import MainPage from "./components/Landing/me";
import ChannelM from "./components/ChannelMessageIndexItem/channelM";
import ComingSoon from "./components/ComingSoonComponent";
import PageNotFound from "./components/ErrorPage";
import MessageIndex from "./components/ChannelMessageIndexItem";
import MessageRequest from "./components/MessageRequestPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const userObj = useSelector(state => state.session.user)
  // console.log('hi this is hte user', userObj)
  const x = {};
  if (Object.values(x)) {
    console.log("a");
  } else {
    console.log("b");
  }
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <ServerPage loaded={loaded} />
      {loaded && ( */}
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/about" exact={true}>
          <About />
        </Route>
        {/* <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute> */}
        <Route path="/" exact={true}>
          <NavBar />
          <SplashPage />
        </Route>
        <Route path="/@me" exact={true}>
          <ServerPage />
          <MainPage />
        </Route>
        <Route path="/@me/:chatId" exact={true}>
          <ServerPage />
          <DmPage />
        </Route>
        <Route path="/server" >
          <ServerPage />
          <MainPage />
        </Route>
        <Route path="/servers/:serverId/:channelId" exact={true}>
          <ServerPage />
          <ChannelIndex />
        </Route>
        <Route path="/coming-soon" exact={true}>
          <ServerPage />
          <ComingSoon />
        </Route>
        <Route path="/message-requests" exact={true}>
          <ServerPage />
          <MessageRequest />
        </Route>
        <Route path="*">
          <NavBar />
          <PageNotFound />
        </Route>
      </Switch>
      {/* )} */}
    </>
  );
}

export default App;
