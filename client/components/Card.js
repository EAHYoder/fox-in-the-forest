import React from "react";

let dummyCard = {
  id: 32,
  suit: "rose",
  number: 2,
  movement: 2,
  special: null,
};

const Card = (props) => {
  let card = props.card || {};

  let movementDiv = "";
  if (card) {
    switch (card.movement) {
      case 0:
        movementDiv = <div></div>;
        break;
      case 1:
        movementDiv = (
          <div className="movement">
            <div className="paw" />
          </div>
        );
        break;
      case 2:
        movementDiv = (
          <div className="movement">
            <div className="paw" />
            <div className="paw" />
          </div>
        );
        break;
      case 3:
        movementDiv = (
          <div className="movement">
            <div className="paw" />
            <div className="paw" />
            <div className="paw" />
          </div>
        );
    }
  }

  return (
    <div>
      <h4>{props.cardRole}</h4>
      <div className={card.id ? "card" : "card-slot"}>
        {card ? (
          <div className={card.suit}>
            <h3 className="card-number">{card.number}</h3>
            <div className={`${card.suit}-img`}></div>
            <div>{card.movement === 0}</div>
            {movementDiv}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
