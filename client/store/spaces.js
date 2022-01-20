import axios from "axios";

//ACTION TYPE
const SET_SPACES = "SET_SPACES";
const MOVE_OFF_PATH = "MOVE_OFF_PATH";
const MOVE_ON_PATH = "MOVE_ON_PATH";

//ACTION CREATOR
export const setSpaces = (spaces) => {
  return {
    type: SET_SPACES,
    spaces,
  };
};

export const moveOnPath = (newFoxSpace) => {
  return {
    type: MOVE_ON_PATH,
    newFoxSpace,
  };
};

//direction can be either left or right
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const moveOffPath = (direction) => {
  return {
    type: MOVE_OFF_PATH,
    direction,
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
    case MOVE_ON_PATH:
      let newFoxSpace = action.newFoxSpace;

      //a gem is picked up if one is on the space.
      if (newFoxSpace.gemCount) {
        newFoxSpace.gemCount--;
      }
      //the fox is correctly relocated
      let newSpaces = [...state];
      // newFoxSpace.trackerPresent = true;
      // newSpaces.splice(oldFoxSpaceIdx, 1, oldFoxSpace);
      // newSpaces.splice(newFoxSpaceIdx, 1, newFoxSpace);
      newSpaces.forEach((space) => {
        if (space.id === newFoxSpace.id) {
          space.trackerPresent = true;
        } else {
          space.trackerPresent = false;
        }
      });
      return newSpaces;
    case MOVE_OFF_PATH:
      let spaces = [...state];
      //if the player went off the board on the right reverse the spaces array.
      if (action.direction === RIGHT) {
        spaces.reverse();
      }
      //find the space whose onPath needs to be reset to false
      //if the player stepped off on the left this is the first space with onPath=true.
      //if the player stepped off on the right this is the last space with onpath=true
      //we reversed the spaces order for stepping off on right so the find function will work
      let spaceToChange = spaces.find((space) => space.onPath);
      spaceToChange.onPath = false;
      let gemsToMove = spaceToChange.gemCount;

      if (action.direction === RIGHT) {
        spaces.reverse;
      }

      //find the space where the fox should be put back on the path.
      let newFoxSpaceId =
        action.direction === RIGHT
          ? spaceToChange.id - 1
          : spaceToChange.id + 1;
      //update the spaces to indicate where the fox has been put back
      spaces.forEach((space) => {
        if (space.id === newFoxSpaceId) {
          space.trackerPresent = true;
          space.gemCount += gemsToMove;
        } else {
          space.trackerPresent = false;
        }
      });

      return spaces;
    default:
      return state;
  }
};
