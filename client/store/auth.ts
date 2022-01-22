import axios from "axios";
import history from "../history";
import socket from "../socket";

const TOKEN = "token";

//ACTION TYPES
const SET_AUTH = "SET_AUTH";

//ACTION CREATORS
//this needs to be export so it will be available to the socket file so it can be invoked when a broadcast logout event is received.
export const setAuth = (auth) => ({ type: SET_AUTH, auth });

//THUNK CREATORS
//this gets information about the current logged in user and put it in the store
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });

    const newPlayer = res.data;
    return dispatch(setAuth(newPlayer));
  }
};

//this can be invoked from either the signup or login components (that varies based on the method.  In sends credentials to the server.  the server returns a token which it then put on local storage).  Then the me thunk is dispatched get  information about the current logged in user and put it in the store.
export const authenticate = (username, password, method) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      const token = res.data.token;
      window.localStorage.setItem(TOKEN, token);

      //this second axios call is here (rather than simply dispatching me() because we need to emit login here rather than in me.  otherwise the player update gets triggered every time me() is called.)
      const res2 = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });

      const newPlayer = res2.data;
      socket.emit("login", newPlayer);

      dispatch(setAuth(newPlayer));
      history.push("/game");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };
};

// this removes the token from local storage.  Then it returns the action object which will set the store's auth to empty.  This doesn't interact with the server but it is still a thunk because it does something that needs to be invoked before returning something that needs to be dispatched to the store.
//I will need to change this so that the logged in status is recorded in the database on the server.
export const logout = () => {
  return async (dispatch) => {
    try {
      //have the server update the player status of all logged in users.
      const res = await axios.put("auth/logout");

      //if the update call to the server was successful remove token from local storage
      if (!!res.data.id) {
        //this emits an event from the client to the server.  That will cause the server to then broadcast the event to the other users so that every logged in user's token will be removed from local storage and the auth will cleared out of their store.
        socket.emit("logout");

        window.localStorage.removeItem(TOKEN);
        // update auth info in the store to be empty
        dispatch(setAuth({}));
        history.push("/login");
      }
    } catch (logoutErr) {
      return dispatch(setAuth({ error: logoutErr }));
    }
  };
};

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
