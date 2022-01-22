//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Space = require("./models/space");
const Card = require("./models/card");
const Deal = require("./models/deal");
//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Space,
    Card,
    Deal,
  },
};
