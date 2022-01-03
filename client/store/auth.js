import axios from "axios";
import history from "../history";

const TOKEN = "token";

//ACTION TYPES
const SET_AUTH = "SET_AUTH";

//ACTION CREATORS
const setAuth = (auth) => ({ type: SET_AUTH, auth });

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
    return dispatch(setAuth(res.data));
  }
};

//this can be invoked from either the signup or login components (that varies based on the method.  In sends credentials to the server.  the server returns a token which it then put on local storage).  Then the me thunk is dispatched get  information about the current logged in user and put it in the store.
export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

// this removes the token from local storage.  Then it returns the action object which will set the store's auth to empty.  This doesn't interact with the server but it is still a thunk because it does something that needs to be invoked before returning something that needs to be dispatched to the store.
//I will need to change this so that the logged in status is recorded in the database on the server.
export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
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
