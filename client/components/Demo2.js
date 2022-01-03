import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Card from "./Card";

const playerACard = {
  id: 2,
  suit: "rose",
  number: 2,
  movement: 2,
  special: null,
};

const playerBCard = {
  id: 1,
  suit: "rose",
  number: 4,
  movement: 1,
  special: null,
};

const Demo2 = () => {
  const foxB = useRef(null);
  const ACard = useRef(null);
  const BCard = useRef(null);
  const movementMath = useRef(null);
  const hoverDiv = useRef(null);

  useLayoutEffect(() => {
    let done = false;

    const handleMouseEnter = () => {
      done = false;
      let timeline2 = anime.timeline({
        duration: 4000,
        loop: true,
        loopComplete: (timeline) => {
          if (done) {
            timeline.pause();
          }
        },
      });

      timeline2.add({
        targets: ACard.current,
        opacity: [0, 1],
        duration: 1500,
      });
      timeline2.add({
        targets: BCard.current,
        opacity: [0, 1],
        duration: 1500,
      });
      timeline2.add({
        targets: movementMath.current,
        opacity: [0, 1],
        duration: 1500,
      });
      timeline2.add({
        targets: foxB.current,
        translateX: 300,
        duration: 1500,
        easing: "easeInOutQuad",
      });
    };

    const handleMouseLeave = () => {
      done = true;
    };

    hoverDiv.current.addEventListener("mouseenter", handleMouseEnter);
    hoverDiv.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      hoverDiv.current.removeEventListener("mouseenter", handleMouseEnter);
      hoverDiv.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="demo" ref={hoverDiv}>
      <div className="board-and-players">
        <div className="player">
          <h4>Player A</h4>
        </div>
        <div className="larger-path">
          <div className="path-demo">
            <div className="no-gem">
              <p>1</p>
            </div>
            <div className="tracker-line">
              <div className="tracker-demo" ref={foxB}></div>
            </div>
          </div>
          <div className="path-demo">
            <div className="gem">
              <p>1</p>
            </div>
            <div className="tracker-line">
              <div className=""></div>
            </div>
          </div>
          <div className="path-demo">
            <div className="gem">
              <p>2</p>
            </div>
            <div className="tracker-line">
              <div className=""></div>
            </div>
          </div>
          <div className="path-demo">
            <div className="gem">
              <p>1</p>
            </div>
            <div className="tracker-line">
              <div className=""></div>
            </div>
          </div>
        </div>
        <div className="player">
          <h4>Player B</h4>
        </div>
      </div>
      <div className="played-cards">
        <div>
          <h4>Player A's Card </h4>
          <div ref={ACard}>
            <Card card={playerACard} />
          </div>
        </div>
        <div ref={movementMath} className="movement-math">
          <div className="movement">
            <div className="paw" />
            <div className="paw" />
          </div>
          <div className="movement-text">+</div>
          <div className="movement">
            <div className="paw" />
          </div>
          <div className="movement-text">= 3</div>
        </div>
        <div>
          <h4>Player B's Card </h4>
          <div ref={BCard}>
            <Card card={playerBCard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo2;
