import React, { useEffect, useRef } from "react";
import Space from "./Space";
import {
  fetchSpaces,
  setSpaces,
  LEFT,
  RIGHT,
  moveOffPath,
  moveOnPath,
} from "../store/spaces";
import { goUpdatePlayers } from "../store/players";
import { setPlayer0Card, setPlayer1Card } from "../store/playedCards";
import { useSelector, useDispatch } from "react-redux";
import anime from "animejs/lib/anime.es.js";

const Board = (props) => {
  let spaces = useSelector((state) => state.spaces) || [];

  //establish which space has fox.  When the fox moves this information is needed to update the store.
  let [foxSpace] = spaces.filter((space) => {
    return space.trackerPresent;
  });

  let dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => await dispatch(fetchSpaces());
    fetch();
  }, []);

  //get the played cards.  this is needed to check whether the trick is complete and assess the winner.
  const { player0Card, player1Card } = useSelector(
    (state) => state.playedCards
  );
  const trickEnded = player0Card.id && player1Card.id;

  //get the decree card.  This is needed to asses winner at trick end.
  const decree = useSelector((state) => state.decree);

  //establish who is player0.  This is needed for determining movement direction at trick end.
  const players = useSelector((state) => {
    return state.players;
  });
  const [player0] = players.filter((user) => {
    return user.player === 0;
  });
  const [player1] = players.filter((user) => {
    return user.player === 1;
  });

  const determineWinner = () => {
    let winner = null;

    let sameSuit = player0Card.suit === player1Card.suit;

    if (sameSuit) {
      //if the cards are the same suit the card with the highest number wins
      winner = player0Card.number > player1Card.number ? "player0" : "player1";
    }
    if (!sameSuit) {
      //if cards are different suits and a trump was played, the person who played trump wins.

      let trumpPlayed =
        player0Card.suit === decree.suit || player1Card.suit === decree.suit;

      if (trumpPlayed) {
        winner = player0Card.suit === decree.suit ? "player0" : "player1";
      }
      if (!trumpPlayed) {
        //if no trump suit was played and the card are different suits the leading player is winner
        winner = player0.isLeading ? "player0" : "player1";
      }
    }
    return winner;
  };

  //establish handle for fox which can be passed to space (so the ref will be attached to the correct div)
  const fox = useRef(null);

  useEffect(() => {
    if (trickEnded) {
      // evaluate who won the trick
      const winner = determineWinner();

      //if player0 wins then movement is negative.  if player1 wins then movement is positive.
      let movementAmount = player0Card.movement + player1Card.movement;
      let translateFox =
        winner === "player0" ? -100 * movementAmount : 100 * movementAmount;
      //changing the direction in which the fox should move doesn't seem to be working.

      const happensAfterAnime = async () => {
        //dispatch to store information about the new fox location on the board.
        const newFoxSpaceId = foxSpace.id + translateFox / 100;
        let [newFoxSpace] = spaces.filter((space) => {
          return space.id === newFoxSpaceId;
        });

        //establish if the fox has moved off the path
        let offPath =
          newFoxSpaceId < 1 || newFoxSpaceId > 11 || !newFoxSpace.onPath
            ? true
            : false;
        if (offPath) {
          //if the player went off the path udpate the spaces in the store so that:
          //  onPath of the appropriate space is reset to false
          //  trackerPresent is reset to the new end of the path where the fox went off.
          if (newFoxSpaceId < 6) {
            await dispatch(moveOffPath(LEFT));
          }
          if (newFoxSpaceId > 6) {
            await dispatch(moveOffPath(RIGHT));
          }
        } else {
          //if the player didn't go off the path update the spaces in the store so that
          //a gem is picked up if appropriate
          //the fox is correctly relocated
          await dispatch(moveOnPath(newFoxSpace));
        }

        //the initial fox animation has moved the position of the fox tracker on this div.  it needs to be restored to its original position
        let restoreFoxAnime = anime.timeline();
        //make the fox disappear,
        restoreFoxAnime.add({
          targets: fox.current,
          opacity: 0,
          duration: 0,
          easing: "easeInOutQuad",
        });
        //move the fox back onto the correct spot on the path.
        restoreFoxAnime.add({
          targets: fox.current,
          translateX: 0,
          duration: 1,
          easing: "easeInOutQuad",
        });
        //make the fox reaappear,
        restoreFoxAnime.add({
          targets: fox.current,
          opacity: 1,
          duration: 0,
          easing: "easeInOutQuad",
        });

        //dipatch to store and emit information about who should lead the next trick (whoever won this trick)
        if (winner === "player0") {
          player0.isLeading = true;
          player0.isActive = true;
          player1.isLeading = false;
          player1.isActive = false;
        }
        if (winner === "player1") {
          player0.isLeading = false;
          player0.isActive = false;
          player1.isLeading = true;
          player1.isActive = true;
        }
        dispatch(goUpdatePlayers([player0, player1]));

        //clear the played cards so the next trick can be played.
        dispatch(setPlayer0Card({}));
        dispatch(setPlayer1Card({}));
      };

      //animate fox movement.
      anime({
        targets: fox.current,
        translateX: translateFox,
        duration: 1500,
        easing: "easeInOutQuad",
        complete: happensAfterAnime,
      });
    }
  }, [trickEnded]);

  return (
    <div id="board">
      <div className="larger-path">
        {spaces.map((space) => {
          return <Space key={space.id} space={space} fox={fox} />;
        })}
      </div>
    </div>
  );
};

export default Board;
