import React, { useEffect, useRef } from "react";
import Space from "./Space";
import { fetchSpaces } from "../store/spaces";
import { useSelector, useDispatch } from "react-redux";
import anime from "animejs/lib/anime.es.js";

const Board = (props) => {
  let spaces = useSelector((state) => state.spaces) || [];

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

  const determineWinner = () => {
    let winner = null;
    let sameSuit = player0Card.suit === player1Card.suit;
    console.log("the same suit was played:", sameSuit);
    if (sameSuit) {
      //if the cards are the same suit the card with the highest number wins
      winner = player0Card.number > player1Card.number ? "player0" : "player1";
    }
    if (!sameSuit) {
      //if cards are different suits and a trump was played, the person who played trump wins.

      let trumpPlayed =
        player0Card.suit === decree.suit || player1Card.suit === decree.suit;
      console.log(
        "different suits were played and one was the trump:",
        trumpPlayed
      );

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
      const winner = determineWinner;

      //if player0 wins then movement is negative.  if player1 wins then movement is positive.
      let movementAmount = 100 * (player0Card.movement + player1Card.movement);
      let translateFox =
        winner === "player0" ? -movementAmount : +movementAmount;

      //animate fox movement.
      anime({
        targets: fox.current,
        translateX: translateFox,
        duration: 1500,
        easing: "easeInOutQuad",
      });

      //dispatch to store and emit information about the new fox location on the board.

      // dipatch to store and emit information about switching leading player.
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
