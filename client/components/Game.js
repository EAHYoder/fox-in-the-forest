import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from "../store/players";
import Player from "./Player";
import Board from "./Board";
import StartRound from "./StartRound";
import PlayedCards from "./PlayedCards";
import Hand from "./Hand";

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

  return (
    <div>
      <div className="board-and-players">
        <Player player={player0} />
        <Board id="board" />
        <Player player={player1} />
      </div>
      <StartRound />
      <PlayedCards />
      <Hand />
    </div>
  );
};

export default Game;
