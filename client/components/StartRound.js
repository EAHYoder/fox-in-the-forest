import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { goDeleteDeal, goMakeDeal } from "../store/deal";
import { goUpdatePlayers } from "../store/players";

//this component is  a button that will dispatch a thunk to build the deal (thats like shuffling) and emit an event so the server will tell other players the deal has been done
//getting the cards into the store for the local auth hand and the decree is hanlded by those components.

const StartRound = () => {
  let dispatch = useDispatch();
  let existingDeal = useSelector((state) => state.deal);

  let midRound = useSelector((state) => {
    let remainingGemCount = state.spaces.length
      ? state.spaces.reduce((runningCount, currentSpace) => {
          return runningCount + currentSpace.gemCount;
        }, 0)
      : 1;
    //the game is midRound if
    //there are still cards in the player's hand and
    //the players have not yet lost by oversteppig path more than 3x. and
    //the players have not yet won by collecting all the gems
    return (
      !!state.authHand.length && state.offPathCount < 4 && remainingGemCount
    );
  });

  let players = useSelector((state) => state.players);
  let auth = useSelector((state) => state.auth) || {};
  let authId = null;
  if (auth.id) {
    authId = auth.id;
  }

  const handleClick = async (evt) => {
    evt.preventDefault();

    if (players.length >= 2) {
      //if there is an exisitng deal, delete it from the store and the server
      if (existingDeal !== {}) {
        dispatch(goDeleteDeal());
      }
      //make a new deal for this round and put it in the store
      dispatch(goMakeDeal());

      //the other player is the one who did NOT click start round, so they should now be updated to be the active player and leading player.
      let [otherPlayer] = players.filter((player) => {
        return player.id !== authId;
      });
      otherPlayer.isActive = true;
      otherPlayer.isLeading = true;

      let [thisPlayer] = players.filter((player) => {
        return player.id === authId;
      });
      thisPlayer.isActive = false;
      thisPlayer.isLeading = false;

      let newPlayers = [thisPlayer, otherPlayer];

      dispatch(goUpdatePlayers(newPlayers));
    } else {
      alert("You cannot start a round until there are two players");
    }
  };

  return (
    <div className="player">
      {midRound ? (
        <div></div>
      ) : (
        <button onClick={handleClick} disabled={midRound}>
          Start New Game!
        </button>
      )}
    </div>
  );
};

export default StartRound;
