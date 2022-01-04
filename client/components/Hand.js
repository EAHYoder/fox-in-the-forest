import React, { useEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchHand } from "../store/authHand";

const Hand = () => {
  let auth = useSelector((state) => state.auth) || {};

  //establish what id should be used to access the handIds.
  let authId = 3;
  if (auth.player !== undefined) {
    authId = auth.player;
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

  return (
    <div>
      {authHand.length ? <h4 id="hand-label">Your Hand</h4> : <div></div>}
      <div id="hand">
        {authHand.map((card) => {
          return (
            <div key={card.id} className="hand-card">
              <Card card={card} cardRole="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hand;
