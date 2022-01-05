import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHand } from "../store/authHand";
import { emitPlayedCard } from "../store/playedCards";
import { goUpdatePlayers } from "../store/players";
import anime from "animejs/lib/anime.es.js";

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

  //we will need to be able to dispatch actions and thunks inside the playcard handler.
  let dispatch = useDispatch();

  //The position of the playedCard slot for each player is needed to animate the movement of a card being played.
  const playedCardSlot0 = useSelector(
    (state) => state.playedCards.player0Card.position
  );
  const playedCardSlot1 = useSelector(
    (state) => state.playedCards.player1Card.position
  );

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

        // have both cards in this trick been played?  check the playedCards from store.  if so
        // switch leading player.
        // evaluate who won the trick
      };

      //animate movement of the card
      const travelX =
        thisPlayerNum === 0
          ? playedCardSlot0[0] - thisCard.current.getBoundingClientRect().x
          : playedCardSlot1[0] - thisCard.current.getBoundingClientRect().x;
      const travelY =
        thisPlayerNum === 0
          ? playedCardSlot0[1] - thisCard.current.getBoundingClientRect().y
          : playedCardSlot1[1] - thisCard.current.getBoundingClientRect().y;

      console.log("travel X", travelX);
      console.log("travel y", travelY);
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
        onClick={() => playCard(card)}
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
