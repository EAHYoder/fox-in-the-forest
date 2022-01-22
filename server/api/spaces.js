const router = require("express").Router();
const {
  models: { Space },
} = require("../db");

//routes here are already mounted on /api/spaces

//get all spaces.
router.get("/", async (req, res, next) => {
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
module.exports = router;
