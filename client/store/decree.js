import axios from "axios";

//ACTION TYPE
const SET_DECREE = "SET_DECREE";

//ACTION CREATOR
const setDecree = (card) => {
  return {
    type: SET_DECREE,
    card,
  };
};

//THUNK CREATOR
export const fetchdecree = (cardId) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`/api/cards/${cardId}`);
      return dispatch(setDecree(response.data));
    } catch (error) {
      console.log(
        "There was an error in fetching the current decree from the server"
      );
    }
  };
};

//REDUCER
export default (state = {}, action) => {
  switch (action.type) {
    case SET_DECREE:
      return action.card;
    default:
      return state;
  }
};
