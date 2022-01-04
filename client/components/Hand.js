import React, { useEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchHand, setHand } from "../store/authHand";
import { emitPlayedCard } from "../store/playedCards";
// import { me } from "../store/auth";
import { goUpdatePlayers } from "../store/players";

const Hand = () => {
  let thisPlayer = useSelector((state) => state.auth) || {};

  //establish what id should be used to access the handIds.
  let authId = 3;
  if (thisPlayer.player !== undefined) {
    authId = thisPlayer.player;
  }

  //when the array of IDs for cards that go into this  player's hand is available in the store use it to go get an array of card objects from the store.
  let handIds = useSelector((state) => state.deal[`player${authId}Hand`]) || [];

  let dispatch = useDispatch();
  useEffect(() => {
    if (handIds.length) {
      //only try to fetch hands if there is a deal that defines what they should be.
      dispatch(fetchHand(handIds));
    }
  }, [handIds, authId]);

  let authHand = useSelector((state) => state.authHand) || [];

  //establish who the other player is.  This will be needed at the end of the playCard handler.
  // const [otherPlayer] = useSelector((state) => {
  //   return state.players.filter((player) => {
  //     return player.player !== authId;
  //   });
  // });
  const players = useSelector((state) => {
    return state.players;
  });
  const [otherPlayer] = players.filter((user) => {
    return user.player !== authId;
  });

  const playCard = async (playedCard) => {
    //check that the person trying to play a card is active.
    if (thisPlayer.isActive) {
      //check whether this is the first card in the trick(is this player the leading player?).
      //if it is not the first card in the trick check suit of the first card.
      //does this hand have a card of that suit?  if so one of those cards must be played.

      //remove the card from authHand
      const newHand = authHand.filter((card) => {
        return card.id !== playedCard.id;
      });
      dispatch(setHand(newHand));

      //make this card the played Card for this player(this will involve emitted an event about the played Card)
      dispatch(emitPlayedCard(playedCard, authId));

      //update both players to indicate that the activeplayer has switched.
      thisPlayer.isActive = false;
      otherPlayer.isActive = true;
      dispatch(goUpdatePlayers([thisPlayer, otherPlayer]));

      //have both cards in this trick been played?  check the playedCards from store.  if so
      // switch leading player.
      //evaluate who won the trick
    } else {
      alert("You cannot play a card unless you are the active player");
    }
  };

  return (
    <div>
      {authHand.length ? <h4 id="hand-label">Your Hand</h4> : <div></div>}
      <div id="hand">
        {authHand.map((card) => {
          return (
            <div
              key={card.id}
              className="hand-card"
              onClick={() => playCard(card)}
            >
              <Card card={card} cardRole="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hand;
