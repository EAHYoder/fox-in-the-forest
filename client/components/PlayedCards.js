import React, { useEffect, useRef, useLayoutEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchdecree } from "../store/decree";
import { setCardPositions } from "../store/playedCards";

const PlayedCards = () => {
  let players = useSelector((state) => state.players) || [];

  let [player0] = players.filter((user) => {
    return user.player === 0;
  });
  let player0Name =
    player0 && player0.username ? player0.username : "First Player";

  let [player1] = players.filter((user) => {
    return user.player === 1;
  });
  let player1Name =
    player1 && player1.username ? player1.username : "Second Player";

  //when the decree Id becomes available in the store use it to go get the decree object from the server.
  let decreeId = useSelector((state) => state.deal.decree) || 0;

  let dispatch = useDispatch();
  useEffect(() => {
    //only try to fetch the decree card if the Id for the decree has been set.
    if (decreeId) {
      dispatch(fetchdecree(decreeId));
    }
  }, [decreeId]);
  let decreeCard = useSelector((state) => state.decree) || {};

  let { player0Card, player1Card } =
    useSelector((state) => state.playedCards) || {};

  //obtain the position of the played card for each player.
  const player0CardSlot = useRef(null);
  const player1CardSlot = useRef(null);

  //put the positions of played cards in the store.  this will allow the Hand Component to access it so card play can be animated.
  useLayoutEffect(() => {
    const player0CardPos = [
      player0CardSlot.current.getBoundingClientRect().x,
      player0CardSlot.current.getBoundingClientRect().y,
    ];
    const player1CardPos = [
      player1CardSlot.current.getBoundingClientRect().x,
      player1CardSlot.current.getBoundingClientRect().y,
    ];
    dispatch(setCardPositions(player0CardPos, player1CardPos));
  }, []);

  return (
    <div className="played-cards">
      <div ref={player0CardSlot}>
        <Card
          cardRole={`${player0Name}'s Card`}
          card={player0Card.card.id ? player0Card.card : null}
        />
      </div>
      <div>
        <Card
          cardRole="Decree Card"
          card={decreeCard === {} ? null : decreeCard}
        />
      </div>
      <div ref={player1CardSlot}>
        <Card
          cardRole={`${player1Name}'s Card`}
          card={player1Card.card.id ? player1Card.card : null}
        />
      </div>
    </div>
  );
};

export default PlayedCards;
