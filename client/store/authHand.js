import axios from "axios";

//ACTION TYPE
const SET_HAND = "SET_HAND";

//ACTION CREATOR
//takes in an array of card objects for the hand of the authorized player
export const setHand = (hand) => {
  return {
    type: SET_HAND,
    hand,
  };
};

//THUNK CREATOR
//takes in an arry of card IDs for the hand of the authorized player
export const fetchHand = (handIds) => {
  return async (dispatch) => {
    try {
      //I originally tried to do this with a map function where I returned each card.  That resulted in me returning the
      let hand = [];
      for (let i = 0; i < 11; i++) {
        let response = await axios.get(`/api/cards/${handIds[i]}`);
        hand.push(response.data);
      }

      return dispatch(setHand(hand));
    } catch (error) {
      console.log(
        "There was an error in fetching the cards for this player's hand from the server"
      );
    }
  };
};

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case SET_HAND:
      return action.hand;
    default:
      return state;
  }
};
