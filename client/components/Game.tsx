import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from "../store/players";
import Player from "./Player";
import Board from "./Board";
import StartRound from "./StartRound";
import PlayedCards from "./PlayedCards";
import OffPathCount from "./OffPathCount";
import Hand from "./Hand";
import Message from "./Message";

const Game = () => {
  //gives us access to the redux store without using mapStateToProps
  let auth = useSelector((state) => state.auth) || {};
  let players = useSelector((state) => state.players) || [];
  let [player0] = players.filter((user) => {
    return user.player === 0;
  });
  let [player1] = players.filter((user) => {
    return user.player === 1;
  });
  //takes the place of componentDidUpdate, and mapDispatchToProps for fetchPlayers
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [auth]);

  //establish handles for the playercard slots which can be passed to both PlayedCards (so the ref will be attached to the correct div) and Hand (where the handle will be used to access the card slot positions)
  const player0CardSlot = useRef(null);
  const player1CardSlot = useRef(null);

  //establish hanlde from the fox which can be passed to Hand->Card (so the handle can be used to animate the fox movement) and Board->space (so the ref will be attached to the correct div)
  // const fox = useRef(null);

  return (
    <div>
      <div className="top-of-game">
        <StartRound />
        <OffPathCount />
        <Message />
      </div>
      <div className="board-and-players">
        <Player player={player0} />
        <Board id="board" />
        <Player player={player1} />
      </div>

      <PlayedCards
        player0CardSlot={player0CardSlot}
        player1CardSlot={player1CardSlot}
      />
      <Hand
        player0CardSlot={player0CardSlot}
        player1CardSlot={player1CardSlot}
      />
    </div>
  );
};

export default Game;
