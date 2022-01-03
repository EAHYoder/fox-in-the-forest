import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Card from "./Card";

const leadingCard = {
  id: 5,
  suit: "star",
  number: 2,
  movement: 2,
  special: null,
};

const handCards = [
  {
    id: 1,
    suit: "star",
    number: 4,
    movement: 1,
    special: null,
  },
  {
    id: 2,
    suit: "rose",
    number: 2,
    movement: 1,
    special: null,
  },
  {
    id: 3,
    suit: "dove",
    number: 8,
    movement: 2,
    special: null,
  },
];

const Demo3 = () => {
  const leadCard = useRef(null);
  const followCard = useRef(null);
  const followCardSlot = useRef(null);
  const hoverDiv = useRef(null);

  useLayoutEffect(() => {
    //done gets rest to true when the mouse leaves the anime div.
    let done = false;

    const handleHover = () => {
      done = false;
      let timeline = anime.timeline({
        duration: 1500,
        loop: true,
        loopComplete: (timeline) => {
          if (done) {
            timeline.pause();
          }
        },
      });

      let travelX =
        followCardSlot.current.getBoundingClientRect().x -
        followCard.current.getBoundingClientRect().x -
        10;

      let travelY =
        followCardSlot.current.getBoundingClientRect().y -
        followCard.current.getBoundingClientRect().y -
        20;

      timeline.add({
        targets: followCard.current,
        translateX: travelX,
        translateY: travelY,
        duration: 1500,
        delay: 300,
        easing: "easeInOutQuad",
      });
    };

    //this makes it so that the animation loop stops when the mouse is not over the div
    const handleMouseLeave = () => {
      done = true;
    };

    hoverDiv.current.addEventListener("mouseenter", handleHover);
    hoverDiv.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      hoverDiv.current.removeEventListener("mouseenter", handleHover);
      hoverDiv.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="demo" ref={hoverDiv}>
      <div className="played-cards">
        <div>
          <h4 className="demo-role">Leading Player's Card </h4>
          <div ref={leadCard}>
            <Card card={leadingCard} />
          </div>
        </div>
        <div>
          <h4 className="demo-role">Following Player's Card </h4>

          <div className="card-slot" ref={followCardSlot}></div>
        </div>
      </div>
      <div>
        <h4>Following Player's Hand </h4>
        <div className="hand-demo">
          <div ref={followCard}>
            <Card card={handCards[0]} />
          </div>
          <div>
            <Card card={handCards[1]} />
          </div>
          <div>
            <Card card={handCards[2]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo3;
