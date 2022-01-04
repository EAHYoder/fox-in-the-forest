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

//update information about the users who are currently logged in as players
router.put("/players", async (req, res, next) => {
  try {
    //establish what the new player objects are from the req.body
    const newPlayer0 = req.body[0];
    const newPlayer1 = req.body[1];

    //use the id from the new version of the players to find the old version of them in the database (because the id is something that will never be modified)
    const player0 = await User.findByPk(newPlayer0.id);
    const player1 = await User.findByPk(newPlayer1.id);

    //update the players to reflect their new versions.
    await player0.update(newPlayer0);
    await player1.update(newPlayer1);

    res.json([player0, player1]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
