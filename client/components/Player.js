import React from "react";

const Player = (props) => {
  let playerName = "";
  if (props.player && props.player.username) {
    playerName = props.player.username;
  }

  return (
    <div className="player">
      {playerName === "" ? (
        <h5>Waiting for this player to join</h5>
      ) : (
        <h4>{playerName}</h4>
      )}
    </div>
  );
};

export default Player;
