import React from "react";

const Space = (props) => {
  let { trackerPresent, onPath, gemCount, gemIncrement } = props.space;
  return (
    <div className="space">
      {onPath ? (
        <div className="path">
          <div className={gemCount > 0 ? "gem" : "no-gem"}>
            <p>{gemCount}</p>
          </div>
          <div className="tracker-line">
            <div className={trackerPresent ? "tracker" : ""}></div>
          </div>
        </div>
      ) : (
        <div className="off-path"></div>
      )}
    </div>
  );
};

export default Space;
