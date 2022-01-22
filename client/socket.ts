import io from "socket.io-client";
import history from "./history";
import store from "./store";
import { setAuth, me } from "./store/auth";
import {
  gotNewPlayerFromServer,
  goUpdatePlayers,
  setPlayers,
} from "./store/players";
import { setDeal } from "./store/deal";
import { setDecree } from "./store/decree";
import { setHand } from "./store/authHand";
import { setPlayer0Card, setPlayer1Card } from "./store/playedCards";

const socket = io(window.location.origin);
const TOKEN = "token";

socket.on("connect", () => {
  console.log("I am now connected to the server!");

  //this will receive emits that are broadcast from the server (the server would be broadcasting them because some other user would have emited them to the server)
  socket.on("logout", () => {
    window.localStorage.removeItem(TOKEN);
    store.dispatch(setAuth({}));
    store.dispatch(setDeal({}));
    store.dispatch(setDecree({}));
    store.dispatch(setHand([]));
    history.push("/login");
  });

  //this will receive emits from the server about another players logging in. That will cause the local store to be correctly updated with the new player's info so the board will display correctly.
  socket.on("login", (newPlayer) => {
    store.dispatch(gotNewPlayerFromServer(newPlayer));
  });

  socket.on("newDeal", (newDeal) => {
    store.dispatch(setDeal(newDeal));
  });

  socket.on("updatePlayers", (newPlayers) => {
    store.dispatch(setPlayers(newPlayers));
    store.dispatch(me()); //this is needed to update on auth in the store whether the player is active.
  });

  socket.on("playCard", ({ card, playerNum }) => {
    if (playerNum === 0) {
      store.dispatch(setPlayer0Card(card));
    }
    if (playerNum === 1) {
      store.dispatch(setPlayer1Card(card));
    }
  });
});

export default socket;
