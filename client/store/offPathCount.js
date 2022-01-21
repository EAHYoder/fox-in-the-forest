import axios from "axios";

//ACTION TYPE
const INCREMENT_OFFPATH_COUNT = "INCREMENT_OFFPATH_COUNT";

//ACTION CREATOR
export const incrementOffPathCount = () => {
  return {
    type: INCREMENT_OFFPATH_COUNT,
  };
};

//THUNK CREATOR
// export const thunk = (cardId) => {
//   return async (dispatch) => {
//     try {

//     } catch (error) {
//       console.log()
//       );
//     }
//   };
// };

//REDUCER
export default (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_OFFPATH_COUNT:
      return state + 1;
    default:
      return state;
  }
};
