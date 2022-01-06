import React, { useRef } from "react";

const Space = (props) => {
  let { trackerPresent, onPath, gemCount, gemIncrement } = props.space;
  const noFox = useRef(null);
  return (
    <div className="space">
      {onPath ? (
        <div className="path">
          <div className={gemCount > 0 ? "gem" : "no-gem"}>
            <p>{gemCount}</p>
          </div>
          <div className="tracker-line">
            <div
              className={trackerPresent ? "tracker" : ""}
              ref={trackerPresent ? props.fox : noFox}
            ></div>
          </div>
        </div>
      ) : (
        <div className="off-path"></div>
      )}
    </div>
  );
};

export default Space;
