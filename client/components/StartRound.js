import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { goDeleteDeal, goMakeDeal } from "../store/deal";

//this component is  a button that will dispatch a thunk to build the deal (thats like shuffling) and emit an event so the server will tell other players the deal has been done
//Perhaps this shoudl also trigger making the player who did not click "start new round" the active player who leads the first trick?
//getting the cards into the store for the local auth hand and the decree is hanlded by those components.

const StartRound = () => {
  let dispatch = useDispatch();
  let existingDeal = useSelector((state) => state.deal);
  //access the decree id from the deal object in the store.  use it to be the decree card object in the store.

  const handleClick = async (evt) => {
    evt.preventDefault();

    //if there is an exisitng deal, delete it from the store and the server
    if (existingDeal !== {}) {
      dispatch(goDeleteDeal());
    }
    //make a new deal for this round and put it in the store
    dispatch(goMakeDeal());
  };

  return (
    <div className="player">
      <button onClick={handleClick}>Start New Round!</button>
    </div>
  );
};

export default StartRound;
