import axios from "axios";
import socket from "../socket";

//ACTION TYPE
const SET_PLAYERS = "SET_PLAYERS";
const GOT_NEW_PLAYER_FROM_SERVER = "GOT_NEW_PLAYER_FROM_SERVER";

//ACTION CREATOR
export const setPlayers = (players) => {
  return {
    type: SET_PLAYERS,
    players,
  };
};

export const gotNewPlayerFromServer = (newPlayer) => {
  return {
    type: GOT_NEW_PLAYER_FROM_SERVER,
    newPlayer,
  };
};

//THUNK CREATOR
export const fetchPlayers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users/players");
      dispatch(setPlayers(data));
    } catch (error) {
      console.log("there was an error fetching the players from the server");
    }
  };
};

export const goUpdatePlayers = (newPlayers) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/api/users/players", newPlayers);
      socket.emit("updatePlayers", newPlayers);
      dispatch(setPlayers(data));
    } catch (error) {
      console.log(
        "There was an error while trying to update the players on the server."
      );
    }
  };
};

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return action.players;
    case GOT_NEW_PLAYER_FROM_SERVER:
      return [...state, action.newPlayer];
    default:
      return state;
  }
};
