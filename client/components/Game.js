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

  //takes the place of componentDidUpdate, and mapDispatchToProps for fetchPlayers
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [auth]);

  return (
    <div>
      <div className="board-and-players">
        <Player player={players[0]} />
        <Board id="board" />
        <Player player={players[1]} />
      </div>
      <StartRound />
      <PlayedCards />
      <Hand />
    </div>
  );
};

export default Game;
