import axios from "axios";
import socket from "../socket";

//ACTION TYPE
const SET_PLAYER0_CARD = "SET_PLAYER0_CARD";
const SET_PLAYER1_CARD = "SET_PLAYER1_CARD";

//ACTION CREATOR
//PlayerNum will be either 0 or 1.
export const setPlayer0Card = (card) => {
  return {
    type: SET_PLAYER0_CARD,
    card,
  };
};

export const setPlayer1Card = (card) => {
  return {
    type: SET_PLAYER1_CARD,
    card,
  };
};

//THUNK CREATOR
//the database doesn't need to be updated but we do need to emit an event about the played card
export const emitPlayedCard = (card, playerNum) => {
  return (dispatch) => {
    socket.emit("playCard", { card, playerNum });
    if (playerNum === 0) {
      return dispatch(setPlayer0Card(card));
    }
    if (playerNum === 1) {
      return dispatch(setPlayer1Card(card));
    }
  };
};

//REDUCER
const initialState = {
  player0Card: {},
  player1Card: {},
};

export default (state = initialState, action) => {
  let newPlayer0Card = { ...state.player0Card };
  let newPlayer1Card = { ...state.player1Card };
  switch (action.type) {
    case SET_PLAYER0_CARD:
      newPlayer0Card = action.card;
      return { player0Card: newPlayer0Card, player1Card: newPlayer1Card };
    case SET_PLAYER1_CARD:
      newPlayer1Card = action.card;
      return { player0Card: newPlayer0Card, player1Card: newPlayer1Card };

    default:
      return state;
  }
};
