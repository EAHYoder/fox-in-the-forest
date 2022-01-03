const Sequelize = require("sequelize");
const db = require("../db");

const Card = db.define("card", {
  suit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
  },
  movement: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 3,
    },
  },
  //certain cards have a special name associated powers.  I probably won't get that far in this project, but this is here as a place holder
  special: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});

module.exports = Card;
