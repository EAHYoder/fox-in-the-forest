import React from "react";
import { useSelector } from "react-redux";

const Game = () => {
  const username = useSelector((state) => state.auth.username);

  return (
    <div>
      <h3>This is the game component</h3>
    </div>
  );
};

export default Game;
