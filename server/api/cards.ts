const router = require("express").Router();
const {
  models: { Card },
} = require("../db");

//routes here are already mounted on /api/cards

//get one specific card
router.get("/:cardId", async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.cardId);
    res.json(card);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
