import * as express from "express"
const router= express.Router()
import { Deal } from "../db";

//routes here are already mounted on /api/deal

router.get("/", async (req: Express.Request, res: Express.Response, next) => {
  try {
    //there should only ever be one deal.
    const [deal] = await Deal.findAll();

    res.json(deal);
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req: Express.Request, res: Express.Response, next) => {
  try {
    // there should only ever be one deal at a time, so there is only one option of what to delete.
    const [existingDeal] = await Deal.findAll();
    if (existingDeal) {
      existingDeal.destroy();
    }
    res.json(existingDeal);
  } catch (error) {
    next(error);
  }
});

//make a deal
router.post("/", async (req: Express.Request, res: Express.Response, next) => {
  try {
    //MAKE AN ARRAY OF CARD IDs IN RANDOM ORDER FROM WHICH YOU CAN DEAL
    //list out the card IDs that needs to be shuffled
    let unshuffledCardIds = [];
    for (let i = 1; i < 31; i++) {
      unshuffledCardIds.push(i);
    }
    let remainingCardCount = 30;
    let randomIdx = 0;
    let shuffledDeck = [];

    //keep looping while there are still cards IDs that need to be shuffled into the deck
    while (remainingCardCount !== 0) {
      //pick a  card ID at random from those that remain
      randomIdx = Math.floor(Math.random() * remainingCardCount);

      //Add thr card ID at that index to the shuffled deck.
      shuffledDeck.push(unshuffledCardIds[randomIdx]);
      //remove the shuffled ID from the list of IDs that need to be shuffled.
      unshuffledCardIds.splice(randomIdx, 1);
      remainingCardCount--;
    }

    //DEAL FROM THE SHUFFLED DECK A HAND FOR EACH PLAYER
    //this function takes in a shuffled deck.  it splices out 11 cards from the start and returns them
    const dealHand = (deck) => {
      //take 11 cards from the start of the deck and put them in the new hand
      let hand = deck.slice(0, 11);
      //remove those same 11 cards from the deck's start
      deck.splice(0, 11);
      return hand;
    };

    let hand0 = dealHand(shuffledDeck);
    let hand1 = dealHand(shuffledDeck);
    let decree = shuffledDeck.pop();

    //make the new deal
    const deal = {
      undealtCards: shuffledDeck,
      player0Hand: hand0,
      player1Hand: hand1,
      decree: decree,
    };

    const newDeal = await Deal.create(deal);
    res.json(newDeal);
  } catch (error) {
    next(error);
  }
});

export default router;
