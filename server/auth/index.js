const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

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
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
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

//we will need a put log out route because I want a way to see which players are logged in so that no more than 2 can log in.
