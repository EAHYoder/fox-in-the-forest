import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import spaces from "./spaces";
import players from "./players";
import deal from "./deal";
import decree from "./decree";
import authHand from "./authHand";
import playedCards from "./playedCards";
import offPathCount from "./offPathCount";

const rootReducer = combineReducers({
  auth,
  spaces,
  players,
  deal,
  decree,
  authHand,
  playedCards,
  offPathCount,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store;
export * from "./auth";
