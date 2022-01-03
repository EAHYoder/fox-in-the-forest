const router = require("express").Router();
const {
  models: { Space },
} = require("../db");

//routes here are already mounted on /api/spaces

//get all spaces.
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.json(spaces);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
