import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Card from "./Card";
import Demo1 from "./Demo1";
import Demo2 from "./Demo2";
import Demo3 from "./Demo3";
const Rules = () => {
  return (
    <div>
      <div className="rule-concept">
        <p className="rule-text">
          The goal of the game is for the fox to collect all the gems without
          straying off the path too many times. The two players cooperatively
          move the fox back and forth along the path.
        </p>
      </div>
      <div className="rule-concept">
        <p className="rule-text">
          When the fox lands on a space with a gem it picks up that gem.
        </p>

        {/* Something about demo1 causes the text to only be allowed a tiny amoutn of space */}
        <div className="demo-larger">
          <Demo1 />
        </div>
      </div>
      <div className="rule-concept">
        <p className="rule-text">
          The fox moves in the direction of the player who won the most recent
          trick. The distance the fox moves is the total number of paw prints on
          both of the cards played in the most recent trick.
        </p>
        <div className="demo-larger">
          <Demo2 />
        </div>
      </div>
      <div className="rule-concept">
        <p className="rule-text">
          The following player in a trick must play a card matching the suit of
          the leading card if they can. Otherwise they may play any card they
          like.
        </p>
        <div className="demo-larger">
          <Demo3 />
        </div>
      </div>
    </div>
  );
};

export default Rules;
