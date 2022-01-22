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
        <div>
          <h4>{playerName}</h4>
          {props.player.isActive ? (
            <h5 className="active-label">Active Player</h5>
          ) : (
            <h5></h5>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
