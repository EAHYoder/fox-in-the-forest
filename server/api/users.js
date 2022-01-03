const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { User },
} = require("../db");

//get all user who have ever signed up (I dont think my app needs this, but it's not a bad route to have)
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get all users who are currenly logged in as players
router.get("/players", async (req, res, next) => {
  try {
    const players = await User.findAll({
      where: {
        [Sequelize.Op.or]: [{ player: 0 }, { player: 1 }],
      },
    });
    res.json(players);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
