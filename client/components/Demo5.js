import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Card from "./Card";

let leadingCard1 = {
  id: 5,
  suit: "star",
  number: 2,
  movement: 2,
  special: null,
};
let decreeCard = {
  id: 1,
  suit: "dove",
  number: 4,
  movement: 1,
  special: null,
};
let followingCard1 = {
  id: 1,
  suit: "star",
  number: 4,
  movement: 1,
  special: null,
};

let leadingCard2 = {
  id: 1,
  suit: "star",
  number: 4,
  movement: 1,
  special: null,
};
let followingCard2 = {
  id: 5,
  suit: "dove",
  number: 2,
  movement: 2,
  special: null,
};
let followingCard3 = {
  id: 5,
  suit: "rose",
  number: 4,
  movement: 1,
  special: null,
};

const Demo5 = () => {
  return (
    <div className="demo">
      <div className="played-cards">
        <div>
          <h4 className="demo-role"> Leading Card</h4>
          <Card card={leadingCard1} />
        </div>
        <div>
          <h4 className="demo-role">Decree Card </h4>
          <Card card={decreeCard} />
        </div>
        <div>
          <h4 className="demo-role"> Following Card</h4>
          <Card card={followingCard1} />
          <h4 className="demo-winner">Winner </h4>
        </div>
      </div>
      <div className="played-cards">
        <div>
          <h4 className="demo-role">Leading Card </h4>
          <Card card={leadingCard2} />
        </div>
        <div>
          <h4 className="demo-role">Decree Card </h4>
          <Card card={decreeCard} />
        </div>
        <div>
          <h4 className="demo-role">Following Card </h4>
          <Card card={followingCard2} />
          <h4 className="demo-winner">Winner </h4>
        </div>
      </div>
      <div className="played-cards">
        <div>
          <h4 className="demo-role">Leading Card </h4>
          <Card card={leadingCard2} />
          <h4 className="demo-winner">Winner </h4>
        </div>
        <div>
          <h4 className="demo-role">Decree Card </h4>
          <Card card={decreeCard} />
        </div>
        <div>
          <h4 className="demo-role">Following Card </h4>
          <Card card={followingCard3} />
        </div>
      </div>
    </div>
  );
};

export default Demo5;
