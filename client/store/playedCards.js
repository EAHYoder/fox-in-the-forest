import axios from "axios";
import socket from "../socket.js";

//ACTION TYPE
const SET_PLAYER_CARD = "SET_PLAYER_CARD";

//ACTION CREATOR
//PlayerNum will be either 0 or 1.
export const setPlayerCard = (card, playerNum) => {
  return {
    type: SET_PLAYER_CARD,
    card,
    playerNum,
  };
};

//THUNK CREATOR
//the database doesn't need to be updated but we do need to emit an event about the played card
export const emitPlayedCard = (card, playerNum) => {
  return (dispatch) => {
    socket.emit("playCard", { card, playerNum });
    return dispatch(setPlayerCard(card, playerNum));
  };
};

//REDUCER
//The card for player0 is in the 0th slot.
//The card for player1 is in the 1st slot
export default (state = [{}, {}], action) => {
  switch (action.type) {
    case SET_PLAYER_CARD:
      if (action.playerNum === 0) {
        return [action.card, state.slice(1)];
      }
      if (action.playerNum === 1) {
        return [state.slice(0, 1), action.card];
      }
      return state;
    default:
      return state;
  }
};
