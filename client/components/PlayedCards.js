import React, { useEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchdecree } from "../store/decree";

const PlayedCards = () => {
  let players = useSelector((state) => state.players) || [];
  // let player0Name = "First Player";
  // if (player0.username) {
  //   player0Name = players[0].username;
  // }
  let [player0] = players.filter((user) => {
    return user.player === 0;
  });
  let player0Name =
    player0 && player0.username ? player0.username : "First Player";

  // let player1Name = "Second Player";
  // if (players[1] && players[1].username) {
  //   player1Name = players[1].username;
  // }

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

  let [player0Card, player1Card] =
    useSelector((state) => state.playedCards) || [];

  return (
    <div className="played-cards">
      <Card
        cardRole={`${player0Name}'s Card`}
        card={player0Card.id ? player0Card : null}
      />
      <Card
        cardRole="Decree Card"
        card={decreeCard === {} ? null : decreeCard}
      />
      <Card
        cardRole={`${player1Name}'s Card`}
        card={player1Card.id ? player1Card : null}
      />
    </div>
  );
};

export default PlayedCards;
