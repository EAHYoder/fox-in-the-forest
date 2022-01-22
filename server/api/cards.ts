import * as express from "express"
const router= express.Router()
import { Card} from "../db" ;

//routes here are already mounted on /api/cards

//get one specific card
router.get("/:cardId", async (req: express.Request, res: express.Response, next) => {
  try {
    const card = await Card.findByPk(req.params.cardId);
    res.json(card);
  } catch (error) {
    next(error);
  }
});

export default router
