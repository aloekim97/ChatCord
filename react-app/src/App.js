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
import DmPage from './components/Message/theDm'

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
    <BrowserRouter>
      <ServerPage loaded={loaded} />
      {/* {loaded && ( */}
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
        <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            <SplashPage />
          </Route>
          <Route path="/@me" exact={true}>
            <DmBar />
          </Route>
          <Route path="/@me/:chatId" exact={true}>
            <DmPage />
          </Route>
          <Route path="/servers/:serverId/:channelId" exact={true}>
            <ChannelIndex />
          </Route>
        </Switch>
      )
    </BrowserRouter>
  );
}

export default App;
