import "./App.scss";
import HomePage from "./pages/home-page/home-page";
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import VideoPlayer from "./pages/video-palyer-page/video-palyer";
import Header from "./components/header/header";
import { connect } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up";
import PlayListPage from "./pages/playlist-page/playlist-page";
const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/player" component={VideoPlayer} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignInSignUp />)}
        />
        <Route
          exact
          path="/playlist"
          render={() =>
            currentUser ? <PlayListPage /> : <Redirect to="/signin" />
          }
        />
        <Route exact path="/playlist/player" component={VideoPlayer} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
