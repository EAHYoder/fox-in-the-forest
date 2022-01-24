import * as express from "express"
const router= express.Router()
import {User } from "../db";
import Sequelize from "sequelize"

//this generates a token for an existing user
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//this posts a new user in the database and then generates a token for them.
router.post("/signup", async (req, res, next) => {
  try {
    await User.create(req.body);
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

//this gets information about this user who is the logged in user.
router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

//when a player logsout/quits the game the player status of any logged in users must be changed to null.
router.put("/logout", async (req, res, next) => {
  try {
    //get list of the 1-2 logged in players
    const playersIn = await User.findAll({
      where: {
        [Sequelize.Op.or]: [{ player: 0 }, { player: 1 }],
      },
    });

    //updates player status of 1-2 logged in players so they are both now null
    if (playersIn[0]) {
      playersIn[0].update({ player: null });
    }
    if (playersIn[1]) {
      playersIn[1].update({ player: null });
    }

    //SOCKETS: need to invoke something with sockets so that the auth and token of any player whose player status was updated will be done on their client side as well.

    res.send(playersIn[0]);
  } catch (err) {
    next(err);
  }
});

export default router
