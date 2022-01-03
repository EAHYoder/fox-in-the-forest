import io from "socket.io-client";
import store from "./store";
import { setAuth } from "./store/auth";
import { gotNewPlayerFromServer } from "./store/players";
import history from "./history";

const socket = io(window.location.origin);
const TOKEN = "token";

socket.on("connect", () => {
  console.log("I am now connected to the server!");

  //this will receive emits that are broadcast from the server (the server would be broadcasting them because some other user would have emited them to the server)
  socket.on("logout", () => {
    window.localStorage.removeItem(TOKEN);
    store.dispatch(setAuth({}));
    history.push("/login");
  });

  //this will receive emits from the server about another players logging in. That will cause the local store to be correctly updated with the new player's info so the board will display correctly.
  socket.on("login", (newPlayer) => {
    store.dispatch(gotNewPlayerFromServer(newPlayer));
  });
});

export default socket;
