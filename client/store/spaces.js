import axios from "axios";

//ACTION TYPE
const SET_SPACES = "SET_SPACES";

//ACTION CREATOR
export const setSpaces = (spaces) => {
  return {
    type: SET_SPACES,
    spaces,
  };
};

//THUNK CREATOR
export const fetchSpaces = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/spaces");
      dispatch(setSpaces(data));
    } catch (error) {
      console.log("There was an error fetching spaces from the server");
    }
  };
};

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case SET_SPACES:
      return action.spaces;
    default:
      return state;
  }
};
