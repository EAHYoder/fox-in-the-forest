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

  //obtain the player's hand from the store.  this is needed to remove a card from the hand when it is played.  It is also needed to check if a following card is valid.
  let authHand = useSelector((state) => state.authHand) || [];

  let { player0Card, player1Card } = useSelector((state) => {
    return state.playedCards;
  });

  let gameNotLost = useSelector((state) => state.offPathCount < 4);

  const playCard = async (playedCard) => {
    //check if this is valid play
    let validAction = false;
    //one type of valid play is an active leading player.  They can play any card they have.
    if (thisPlayer.isActive && thisPlayer.isLeading && gameNotLost) {
      validAction = true;
    }
    if (!thisPlayer.isActive) {
      alert("You cannot play a card unless you are the active player");
    }

    //this explores the valid plays for an active following player
    if (thisPlayer.isActive && !thisPlayer.isLeading && gameNotLost) {
      //obtain the suit of the leading card played earlier this trick.
      const leadingSuit = player0Card.suit
        ? player0Card.suit
        : player1Card.suit;

      //check if the following player followed suit.
      //another type of valid play is an active following player who follows suit.
      if (leadingSuit === playedCard.suit) {
        validAction = true;
      }

      //check if the following player has the leading suit in their hand
      let hasLeadingSuit = authHand.some(
        (handCard) => handCard.suit === leadingSuit
      );

      //another type of valid play is an active following player who doesn't have the following suit
      if (!hasLeadingSuit) {
        validAction = true;
      }

      if (playedCard.suit !== leadingSuit && hasLeadingSuit) {
        //if the following player could have followed suit and didn't let the user know thats cheating!
        alert(
          "You need to follow the leading player's suit when you have that suit in hand."
        );
      }
    }

    //only run the rest of this function if it is a valid play.
    if (validAction) {
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
