import * as express from "express"
const router= express.Router()

import spacesRouter from "./spaces"
import cardsRouter from "./cards"
import dealRouter from "./deals"
import usersRouter from "./users"

router.use("/cards", cardsRouter);
router.use("/spaces", spacesRouter);
router.use("/users", usersRouter);
router.use("/deal", dealRouter);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//in Juke example of js->ts this was kept as module.exports.
module.exports = router;
