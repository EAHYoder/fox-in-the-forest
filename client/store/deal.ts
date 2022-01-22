import axios from "axios";
import socket from "../socket";

//ACTION TYPE
const SET_DEAL = "SET_DEAL";
const DELETE_DEAL = "DELETE_DEAL";

//ACTION CREATOR
export const setDeal = (deal) => {
  return {
    type: SET_DEAL,
    deal,
  };
};

const deleteDeal = () => {
  return {
    type: DELETE_DEAL,
  };
};

//THUNK CREATOR
export const fetchdeal = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get("/api/deal");
      return dispatch(setDeal(response.data));
    } catch (error) {
      console.log(
        "There was an error in fetching the current deal from the server"
      );
    }
  };
};

export const goMakeDeal = () => {
  return async (dispatch) => {
    try {
      let response = await axios.post("/api/deal");
      const newDeal = response.data;
      socket.emit("newDeal", newDeal); //this socket tells the server to tell the other player about the new deal.
      return dispatch(setDeal(newDeal));
    } catch (error) {
      console.log("There was an error in dealing out cards on the server");
    }
  };
};

export const goDeleteDeal = () => {
  return async (dispatch) => {
    try {
      let response = await axios.delete("/api/deal");
      return dispatch(deleteDeal(response.data));
      //socket should go here to tell the server to tell the other players that the current deal has been deleted.
    } catch (error) {
      console.log(
        "There was an error in deleting the current deal from the server"
      );
    }
  };
};

//REDUCER
export default (state = {}, action) => {
  switch (action.type) {
    case SET_DEAL:
      return action.deal;
    case DELETE_DEAL:
      return {};
    default:
      return state;
  }
};
