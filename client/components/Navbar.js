import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { goDeleteDeal } from "../store/deal";
import { setDecree } from "../store/decree";
import { setHand } from "../store/authHand";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(goDeleteDeal());
    dispatch(setDecree({}));
    dispatch(setHand([]));
    dispatch(logout());
  };
  return (
    <div className="header">
      <div id="header-text">
        <h1>The Fox in the Forest</h1>
        {isLoggedIn ? <h4>Welcome, {username}</h4> : <h3></h3>}
      </div>
      <nav>
        {isLoggedIn ? (
          <div className="nav-links">
            {/* The navbar will show these links after you log in */}
            <Link to="/game" className="nav-item">
              Game
            </Link>
            <Link to="/rules" className="nav-item">
              Rules
            </Link>
            <a className="nav-item" onClick={handleClick}>
              Quit Game
            </a>
          </div>
        ) : (
          <div className="nav-links">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="nav-item">
              Login
            </Link>
            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
