import React, { useEffect } from "react";

import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import Home from "./components/Home";
import { me } from "./store";
import { useDispatch, useSelector } from "react-redux";

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
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
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
