import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHand } from "../store/authHand";
import { emitPlayedCard } from "../store/playedCards";
import { goUpdatePlayers } from "../store/players";
import anime from "animejs/lib/anime.es.js";

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

  //we will need to be able to dispatch actions and thunks inside the playcard handler.
  let dispatch = useDispatch();

  //put a handle on the card.  this is needed to animate playing a card
  const thisCard = useRef(null);

  //establish who this player is both players are.  This will be needed to check if this player is active at the start of the playCard handler
  let thisPlayer = useSelector((state) => state.auth) || {};
  let thisPlayerNum = 3;
  if (thisPlayer.player !== undefined) {
    thisPlayerNum = thisPlayer.player;
  }

  //establish who the other player is.  This will be needed at the end of the playCard handler so that the active player can be switched.
  const players = useSelector((state) => {
    return state.players;
  });
  const [otherPlayer] = players.filter((user) => {
    return user.player !== thisPlayerNum;
  });

  //obtain the player's hand from the store.  this is needed to remove a card from the hand when it is played.
  let authHand = useSelector((state) => state.authHand) || [];

  const playCard = async (playedCard) => {
    //check that the person trying to play a card is active.
    if (thisPlayer.isActive) {
      //check whether this is the first card in the trick(is this player the leading player?).
      //if it is not the first card in the trick check suit of the first card.
      //does this hand have a card of that suit?  if so one of those cards must be played.

      const happensAfterAnime = () => {
        //remove the card from authHand
        const newHand = authHand.filter((card) => {
          return card.id !== playedCard.id;
        });
        dispatch(setHand(newHand));

        //make this card the played Card for this player(this will involve emitted an event about the played Card)
        dispatch(emitPlayedCard(playedCard, thisPlayerNum));

        //update both players to indicate that the activeplayer has switched.
        thisPlayer.isActive = false;
        otherPlayer.isActive = true;
        dispatch(goUpdatePlayers([thisPlayer, otherPlayer]));
      };

      //animate movement of the card
      //get the destination from the handle passed through props from Game component.
      let destinationX =
        thisPlayerNum === 0
          ? props.player0CardSlot.current.getBoundingClientRect().x
          : props.player1CardSlot.current.getBoundingClientRect().x;

      let destinationY =
        thisPlayerNum === 0
          ? props.player0CardSlot.current.getBoundingClientRect().y
          : props.player1CardSlot.current.getBoundingClientRect().y;

      let thisCardX = thisCard.current.getBoundingClientRect().x;
      let thisCardY = thisCard.current.getBoundingClientRect().y;

      const travelX = destinationX - thisCardX + 10;
      const travelY = destinationY - thisCardY + 65;

      anime({
        targets: thisCard.current,
        translateX: travelX,
        translateY: travelY,
        duration: 1500,
        easing: "easeInOutQuad",
        complete: happensAfterAnime,
      });
    } else {
      alert("You cannot play a card unless you are the active player");
    }
  };

  return (
    <div>
      <h4>{props.cardRole}</h4>
      <div
        ref={thisCard}
        onClick={
          props.cardRole === ""
            ? () => playCard(card)
            : () => {
                console.log("");
              }
        }
        className={card.id ? "card" : "card-slot"}
      >
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
