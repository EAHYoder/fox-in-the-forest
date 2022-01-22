import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Card from "./Card";
import Demo1 from "./Demo1";
import Demo2 from "./Demo2";
import Demo3 from "./Demo3";
import Demo4 from "./Demo4";
import Demo5 from "./Demo5";

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
      <div className="rule-concept">
        <div className="rule-text">
          <p>If the fox moves beyond the path:</p>
          <ul>
            <li>
              The end of the path where the fox stepped off will be shortened by
              one space
            </li>
            <li>
              Any gems that had been on the removed part of the path will be
              shifted to the new end of the path.
            </li>
            <li>The fox will be moved to the new end of the path.</li>
          </ul>
          <p>
            If the fox strays from the path more than three times the game is
            over.
          </p>
        </div>
        <div className="demo-larger">
          <Demo4 />
        </div>
      </div>
      <div className="rule-concept">
        <div className="rule-text">
          <p>How the winner of a trick is determined:</p>
          <ul>
            <li>
              If the two cards played are of the same suit, the card with the
              higher number wins.
            </li>
            <li>
              If the two cards are of different suits and one of the played
              suits matches that of the decree card, then that card wins.
            </li>
            <li>
              If the two cards are of different suits and neither of the played
              suits matches that of the decree card, then the card of the
              leading player wins.
            </li>
          </ul>
        </div>
        <div className="demo-larger">
          <Demo5 />
        </div>
      </div>
    </div>
  );
};

export default Rules;
