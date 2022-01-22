import * as express from "express"
const router= express.Router()
import { Space } from "../db";


//routes here are already mounted on /api/spaces

//get all spaces.
router.get("/", async (req: express.Request, res: express.Response, next) => {
  try {

    const spaces = await Space.findAll();
    spaces.sort((first, second) => {
      if (first.id < second.id) {
        return -1;
      }
      if (second.id < first.id) {
        return 1;
      }
    });
    res.json(spaces);
  } catch (error) {
    next(error);
  }
});

export default router;
