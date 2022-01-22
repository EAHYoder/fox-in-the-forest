import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
//thunks which need to be dispatched
import { me } from "./store";
//components to which routes are directed
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import Game from "./components/Game";
import Rules from "./components/Rules";

const Routes = () => {
  //useDispatch takes the place of map dispatch
  // useEffect with an empty dependency array takes the place of componentDidMount
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  //useSelector takes the place of needing to do a mapState
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/game" component={Game} />
          {/* <Redirect to="/game" /> */}
          <Route path="/rules" component={Rules} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
